import { useState, useEffect } from 'react';

export interface PolicyResult {
  score: number;
  assets: Array<{ title: string; description: string; value: number; icon: string }>;
  risks: Array<{ title: string; description: string; value: number; icon: string }>;
  consistencyScore: number;
}

export function useLIK() {
  const API_BASE = import.meta.env.VITE_API_URL || '/api';

  const [policyId, setPolicyId] = useState<string | null>(() => localStorage.getItem('lik_policy_id'));
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PolicyResult | null>(null);

  useEffect(() => {
    if (policyId) {
      localStorage.setItem('lik_policy_id', policyId);
    }
  }, [policyId]);

  const initiatePolicy = async (answers: number[]) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/policy/create`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      setPolicyId(data.policy_id);
      return data;
    } catch (error) {
      console.error('Failed to initiate policy', error);
    } finally {
      setLoading(false);
    }
  };

  const submitAssessment = async (answers: number[], explicitPolicyId?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/submit-assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ policy_id: explicitPolicyId || policyId, answers }),
      });
      if (!res.ok && res.status === 404) {
        return { error: 'not_found' };
      }
      return { success: true };
    } catch (error) {
      console.error('Failed to submit assessment', error);
      return { error: 'network' };
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async (id?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/policy/${id || policyId}/results`);
      if (!res.ok) {
         if (res.status === 400 || res.status === 404) return null; // Not found
      }
      if (res.status === 202) {
         return { pending: true }; // Not ready yet
      }
      const data = await res.json();
      setResults(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch results', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    policyId,
    loading,
    results,
    initiatePolicy,
    submitAssessment,
    fetchResults,
  };
}
