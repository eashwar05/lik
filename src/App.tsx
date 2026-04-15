import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Splash } from './components/Splash';
import { Assessment } from './components/Assessment';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Share } from './components/Share';
import { InvalidPolicy } from './components/InvalidPolicy';
import { useLIK } from './hooks/useLIK';

type Screen = 'splash' | 'assessment' | 'loading' | 'results' | 'share' | 'invalid';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [urlPolicyId, setUrlPolicyId] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  
  const { initiatePolicy, submitAssessment, fetchResults, results, policyId } = useLIK();

  useEffect(() => {
    // Check if there is a policy ID in the URL structure.
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('policyId');
    if (id) {
       setUrlPolicyId(id);
    }
  }, []);

  const handleStartAssessment = () => {
    setScreen('assessment');
  };

  const handleAssessmentComplete = async (answers: number[]) => {
    setScreen('loading');
    
    if (urlPolicyId) {
       // Is User B
       const submitRes = await submitAssessment(answers, urlPolicyId);
       if (submitRes && submitRes.error === 'not_found') {
         setScreen('invalid');
         return;
       }
       const data = await fetchResults(urlPolicyId);
       if (data && !data.pending) {
         setScreen('results');
       } else if (data && data.pending) {
         setScreen('splash'); // Return to splash or could stay on a "waiting" screen
         alert("Assessment secured. Waiting for underwriting engine to finalize results.");
       } else {
         setScreen('invalid');
       }
    } else {
       // Is User A
       await initiatePolicy(answers);
       setScreen('share');
    }
  };

  const handleCheckResults = async () => {
     setIsChecking(true);
     const currentId = urlPolicyId || policyId;
     if (!currentId) return;
     
     const data = await fetchResults(currentId);
     setIsChecking(false);
     
     if (data && !data.pending) {
        setScreen('results');
     } else {
        alert("Policy is still generating or waiting for co-beneficiary signature.");
     }
  };

  return (
    <Layout>
      {screen === 'splash' && (
        <Splash onStart={handleStartAssessment} isInvitedUser={!!urlPolicyId} />
      )}
      {screen === 'assessment' && (
        <Assessment onComplete={handleAssessmentComplete} />
      )}
      {screen === 'loading' && (
        <LoadingScreen />
      )}
      {screen === 'share' && policyId && (
        <Share policyId={policyId} onCheckResults={handleCheckResults} isChecking={isChecking} />
      )}
      {screen === 'results' && results && (
        <ResultsDashboard results={results} />
      )}
      {screen === 'invalid' && (
        <InvalidPolicy onRestart={() => window.location.href = '/'} />
      )}
    </Layout>
  );
}
