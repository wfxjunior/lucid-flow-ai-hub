
import React, { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: number[];
  pulsePhase: number;
  type: 'primary' | 'secondary' | 'tertiary';
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  active: boolean;
}

// Simplified color system - using direct RGB values to avoid HSL parsing issues
const getNodeColor = (type: 'primary' | 'secondary' | 'tertiary'): string => {
  switch (type) {
    case 'primary':
      return '#3b82f6'; // blue-500
    case 'secondary':
      return '#10b981'; // emerald-500
    case 'tertiary':
      return '#f59e0b'; // amber-500
    default:
      return '#6b7280'; // gray-500
  }
};

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number = 1): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(59, 130, 246, ${alpha})`; // fallback blue
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const IntelligentNetworkGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Initialize nodes with simpler color system
  const initializeNodes = (width: number, height: number): Node[] => {
    const nodeCount = Math.min(12, Math.max(6, Math.floor(width / 80)));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const type: 'primary' | 'secondary' | 'tertiary' = 
        i < 3 ? 'primary' : 
        i < 7 ? 'secondary' : 'tertiary';

      nodes.push({
        id: i,
        x: Math.random() * (width - 120) + 60,
        y: Math.random() * (height - 120) + 60,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 8 + 6,
        color: getNodeColor(type),
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        type
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
        }
      }
    });

    return nodes;
  };

  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!canvasRef.current) return;
      
      const container = canvasRef.current.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const width = Math.max(320, Math.min(1200, rect.width));
      const height = Math.max(200, width * 0.5);
      
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize nodes when dimensions change
  useEffect(() => {
    const newNodes = initializeNodes(dimensions.width, dimensions.height);
    setNodes(newNodes);

    const newConnections: Connection[] = [];
    newNodes.forEach(node => {
      node.connections.forEach(targetId => {
        newConnections.push({
          from: node.id,
          to: targetId,
          strength: Math.random() * 0.8 + 0.2,
          active: Math.random() > 0.3
        });
      });
    });
    setConnections(newConnections);
  }, [dimensions]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let time = 0;

    const animate = () => {
      time += 0.016;
      
      // Clear canvas with background
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Update node positions with simple physics
      nodes.forEach(node => {
        // Apply velocity
        node.x += node.vx;
        node.y += node.vy;

        // Boundary collision
        if (node.x <= node.radius || node.x >= dimensions.width - node.radius) {
          node.vx *= -0.8;
          node.x = Math.max(node.radius, Math.min(dimensions.width - node.radius, node.x));
        }
        if (node.y <= node.radius || node.y >= dimensions.height - node.radius) {
          node.vy *= -0.8;
          node.y = Math.max(node.radius, Math.min(dimensions.height - node.radius, node.y));
        }

        // Add repulsion between nodes
        nodes.forEach(otherNode => {
          if (otherNode.id !== node.id) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80 && distance > 0) {
              const force = 0.1 / distance;
              node.vx += (dx / distance) * force;
              node.vy += (dy / distance) * force;
            }
          }
        });

        // Add some damping
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Update pulse phase
        node.pulsePhase += 0.05;
      });

      // Draw connections
      connections.forEach(connection => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        if (!fromNode || !toNode) return;

        ctx.strokeStyle = hexToRgba('#6b7280', connection.active ? 0.3 : 0.1);
        ctx.lineWidth = connection.strength * 2;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        const pulseIntensity = (Math.sin(node.pulsePhase) + 1) * 0.5;
        const currentRadius = node.radius + pulseIntensity * 3;

        // Draw glow effect
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, currentRadius + 8
        );
        glowGradient.addColorStop(0, hexToRgba(node.color, 0.3));
        glowGradient.addColorStop(1, hexToRgba(node.color, 0));
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius + 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw main node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw inner highlight
        ctx.fillStyle = hexToRgba('#ffffff', 0.3);
        ctx.beginPath();
        ctx.arc(node.x - currentRadius * 0.3, node.y - currentRadius * 0.3, currentRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, connections, dimensions]);

  return (
    <section className="py-12 lg:py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Intelligent Network Analysis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how our AI connects and analyzes your business data in real-time
          </p>
        </div>
        
        <div className="relative">
          <div className="w-full max-w-5xl mx-auto bg-card/50 rounded-2xl border border-border/20 p-4 lg:p-8 backdrop-blur-sm">
            <canvas
              ref={canvasRef}
              className="w-full h-auto max-w-full block mx-auto rounded-lg"
              style={{ 
                maxHeight: '400px',
                aspectRatio: '2/1'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
