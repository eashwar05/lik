import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/policy/create", (req, res) => {
    const policyId = `LIK-${Math.floor(100 + Math.random() * 899)}-2026`;
    res.json({ policyId, link: `${process.env.APP_URL || 'http://localhost:3000'}/v/${policyId}-auth` });
  });

  app.post("/api/submit-assessment", (req, res) => {
    // In a real app, we'd save the answers
    res.json({ success: true });
  });

  app.get("/api/results", (req, res) => {
    // Mock results
    const score = 95.0;
    const assets = [
      {
        title: "High-Fidelity Loyalty Bond",
        description: "Assessment identifies a 98% resonance score in shared trajectory goals. Your core foundation is fortified against external market volatility.",
        value: 98,
        icon: "diamond"
      },
      {
        title: "Emotional Liquidity",
        description: "High capacity for rapid conflict resolution and empathetic exchange detected in primary communication channels.",
        value: 85,
        icon: "zap"
      }
    ];
    const risks = [
      {
        title: "Divergent Growth Vector",
        description: "Marginal friction detected in secondary recreational silos. Risk is currently managed but requires quarterly synchronization.",
        value: 24,
        icon: "shield"
      }
    ];
    
    // Simulate loading
    setTimeout(() => {
      res.json({ score, assets, risks, consistencyScore: 92 });
    }, 2000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
