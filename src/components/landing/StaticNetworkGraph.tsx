import React, { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  connections: number[];
  type: 'primary' | 'secondary' | 'tertiary';
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  active: boolean;
}

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

const hexToRgba = (hex: string, alpha: number = 1): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(59, 130, 246, ${alpha})`;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const StaticNetworkGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Initialize static nodes
  const initializeStaticNodes = (width: number, height: number): Node[] => {
    const nodeCount = Math.min(12, Math.max(6, Math.floor(width / 80)));
    const nodes: Node[] = [];

    // Create nodes in a more organized pattern for static display
    for (let i = 0; i < nodeCount; i++) {
      const type: 'primary' | 'secondary' | 'tertiary' = 
        i < 3 ? 'primary' : 
        i < 7 ? 'secondary' : 'tertiary';

      // Position nodes in a grid-like pattern with some randomization
      const cols = Math.ceil(Math.sqrt(nodeCount));
      const rows = Math.ceil(nodeCount / cols);
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const cellWidth = (width - 120) / cols;
      const cellHeight = (height - 120) / rows;
      
      const baseX = 60 + col * cellWidth + cellWidth / 2;
      const baseY = 60 + row * cellHeight + cellHeight / 2;
      
      // Add some randomization but keep it organized
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;

      nodes.push({
        id: i,
        x: Math.max(30, Math.min(width - 30, baseX + offsetX)),
        y: Math.max(30, Math.min(height - 30, baseY + offsetY)),
        radius: Math.random() * 4 + 8,
        color: getNodeColor(type),
        connections: [],
        type
      });
    }

    // Create logical connections
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 2) + 1;
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
    const newNodes = initializeStaticNodes(dimensions.width, dimensions.height);
    setNodes(newNodes);

    const newConnections: Connection[] = [];
    newNodes.forEach(node => {
      node.connections.forEach(targetId => {
        newConnections.push({
          from: node.id,
          to: targetId,
          strength: Math.random() * 0.6 + 0.4,
          active: Math.random() > 0.2
        });
      });
    });
    setConnections(newConnections);
  }, [dimensions]);

  // Static rendering effect
  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Draw connections
    connections.forEach(connection => {
      const fromNode = nodes[connection.from];
      const toNode = nodes[connection.to];
      
      if (!fromNode || !toNode) return;

      ctx.strokeStyle = hexToRgba('#6b7280', connection.active ? 0.4 : 0.15);
      ctx.lineWidth = connection.strength * 2;
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(node => {
      // Draw glow effect
      const glowGradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.radius + 8
      );
      glowGradient.addColorStop(0, hexToRgba(node.color, 0.3));
      glowGradient.addColorStop(1, hexToRgba(node.color, 0));
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw main node
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw inner highlight
      ctx.fillStyle = hexToRgba('#ffffff', 0.4);
      ctx.beginPath();
      ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [nodes, connections, dimensions]);

  return (
    <section className="py-12 lg:py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Intelligent Network Analysis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            How our AI connects and analyzes your business data
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
