import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  NodeProps,
  ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom node component with Attio-inspired design
const DataNode = ({ data, id }: NodeProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, (data.delay as number) || 0);
    
    return () => clearTimeout(timer);
  }, [data.delay]);

  return (
    <div 
      className={`
        relative flex items-center justify-center
        w-16 h-16 rounded-full border-2 
        transition-all duration-1000 ease-out
        ${isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        ${data.type === 'primary' ? 'bg-primary/20 border-primary shadow-lg shadow-primary/25' : 
          data.type === 'secondary' ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/25' :
          data.type === 'success' ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/25' :
          'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/25'}
        backdrop-blur-sm hover:scale-110 cursor-pointer
        before:absolute before:inset-0 before:rounded-full 
        before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
        before:animate-pulse
      `}
    >
      <div className={`
        w-8 h-8 rounded-full 
        ${data.type === 'primary' ? 'bg-primary' : 
          data.type === 'secondary' ? 'bg-blue-500' :
          data.type === 'success' ? 'bg-emerald-500' :
          'bg-amber-500'}
        shadow-lg animate-pulse
      `} />
      
      {/* Pulsing ring effect */}
      <div className={`
        absolute inset-0 rounded-full border-2 
        ${data.type === 'primary' ? 'border-primary/40' : 
          data.type === 'secondary' ? 'border-blue-500/40' :
          data.type === 'success' ? 'border-emerald-500/40' :
          'border-amber-500/40'}
        animate-ping
      `} />
    </div>
  );
};

const nodeTypes = {
  dataNode: DataNode,
};

export const IntelligentNetworkGraph = () => {
  const initialNodes: Node[] = useMemo(() => [
    // Central hub
    {
      id: 'central',
      type: 'dataNode',
      position: { x: 400, y: 300 },
      data: { type: 'primary', delay: 500 },
      draggable: false,
    },
    // Primary ring
    {
      id: 'data-1',
      type: 'dataNode',
      position: { x: 400, y: 150 },
      data: { type: 'secondary', delay: 1000 },
      draggable: false,
    },
    {
      id: 'data-2',
      type: 'dataNode',
      position: { x: 550, y: 300 },
      data: { type: 'secondary', delay: 1200 },
      draggable: false,
    },
    {
      id: 'data-3',
      type: 'dataNode',
      position: { x: 400, y: 450 },
      data: { type: 'secondary', delay: 1400 },
      draggable: false,
    },
    {
      id: 'data-4',
      type: 'dataNode',
      position: { x: 250, y: 300 },
      data: { type: 'secondary', delay: 1600 },
      draggable: false,
    },
    // Secondary ring
    {
      id: 'ai-1',
      type: 'dataNode',
      position: { x: 300, y: 100 },
      data: { type: 'success', delay: 2000 },
      draggable: false,
    },
    {
      id: 'ai-2',
      type: 'dataNode',
      position: { x: 500, y: 100 },
      data: { type: 'success', delay: 2200 },
      draggable: false,
    },
    {
      id: 'ai-3',
      type: 'dataNode',
      position: { x: 650, y: 200 },
      data: { type: 'warning', delay: 2400 },
      draggable: false,
    },
    {
      id: 'ai-4',
      type: 'dataNode',
      position: { x: 650, y: 400 },
      data: { type: 'warning', delay: 2600 },
      draggable: false,
    },
    {
      id: 'ai-5',
      type: 'dataNode',
      position: { x: 500, y: 500 },
      data: { type: 'success', delay: 2800 },
      draggable: false,
    },
    {
      id: 'ai-6',
      type: 'dataNode',
      position: { x: 300, y: 500 },
      data: { type: 'success', delay: 3000 },
      draggable: false,
    },
    {
      id: 'ai-7',
      type: 'dataNode',
      position: { x: 150, y: 400 },
      data: { type: 'warning', delay: 3200 },
      draggable: false,
    },
    {
      id: 'ai-8',
      type: 'dataNode',
      position: { x: 150, y: 200 },
      data: { type: 'warning', delay: 3400 },
      draggable: false,
    },
  ], []);

  const initialEdges: Edge[] = useMemo(() => [
    // Central connections
    { id: 'e-central-1', source: 'central', target: 'data-1', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
    { id: 'e-central-2', source: 'central', target: 'data-2', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
    { id: 'e-central-3', source: 'central', target: 'data-3', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
    { id: 'e-central-4', source: 'central', target: 'data-4', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
    
    // Secondary connections
    { id: 'e-1-ai1', source: 'data-1', target: 'ai-1', animated: true, style: { stroke: '#3b82f6', strokeWidth: 1.5, strokeDasharray: '5,5' } },
    { id: 'e-1-ai2', source: 'data-1', target: 'ai-2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 1.5, strokeDasharray: '5,5' } },
    { id: 'e-2-ai3', source: 'data-2', target: 'ai-3', animated: true, style: { stroke: '#10b981', strokeWidth: 1.5, strokeDasharray: '5,5' } },
    { id: 'e-2-ai4', source: 'data-2', target: 'ai-4', animated: true, style: { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '5,5' } },
    { id: 'e-3-ai5', source: 'data-3', target: 'ai-5', animated: true, style: { stroke: '#10b981', strokeWidth: 1.5, strokeDasharray: '5,5' } },
    { id: 'e-3-ai6', source: 'data-3', target: 'ai-6', animated: true, style: { stroke: '#10b981', strokeWidth: 1.5, strokeDasharray: '5,5' } },
    { id: 'e-4-ai7', source: 'data-4', target: 'ai-7', animated: true, style: { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '5,5' } },
    { id: 'e-4-ai8', source: 'data-4', target: 'ai-8', animated: true, style: { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '5,5' } },
    
    // Cross connections for complexity
    { id: 'e-ai1-ai3', source: 'ai-1', target: 'ai-3', animated: true, style: { stroke: '#6b7280', strokeWidth: 1, opacity: 0.5 } },
    { id: 'e-ai2-ai4', source: 'ai-2', target: 'ai-4', animated: true, style: { stroke: '#6b7280', strokeWidth: 1, opacity: 0.5 } },
    { id: 'e-ai5-ai7', source: 'ai-5', target: 'ai-7', animated: true, style: { stroke: '#6b7280', strokeWidth: 1, opacity: 0.5 } },
    { id: 'e-ai6-ai8', source: 'ai-6', target: 'ai-8', animated: true, style: { stroke: '#6b7280', strokeWidth: 1, opacity: 0.5 } },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Auto-rotate nodes slightly for dynamic effect
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === 'central') return node;
          
          const angle = (Date.now() / 5000) + (parseInt(node.id.split('-')[1] || '0') * 0.5);
          const radius = node.id.startsWith('data-') ? 120 : 200;
          const centerX = 400;
          const centerY = 300;
          
          return {
            ...node,
            position: {
              x: centerX + Math.cos(angle) * radius - 32,
              y: centerY + Math.sin(angle) * radius - 32,
            },
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [setNodes]);

  return (
    <section className="relative py-20 bg-gradient-to-b from-background via-muted/10 to-background overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, hsl(var(--accent) / 0.1) 0%, transparent 50%),
            linear-gradient(135deg, transparent 25%, hsl(var(--border) / 0.05) 25%, hsl(var(--border) / 0.05) 50%, transparent 50%)
          `,
          backgroundSize: '400px 400px, 600px 600px, 60px 60px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Intelligent Network Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            How our AI connects and analyzes your business data in real-time, creating intelligent insights that drive growth
          </p>
        </div>
        
        <div className="relative h-[600px] w-full bg-gradient-to-br from-card/50 to-background/50 rounded-3xl border border-border/50 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Subtle animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 animate-pulse" />
          
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            className="bg-transparent"
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            preventScrolling={false}
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1}
              className="opacity-20"
              color="hsl(var(--muted-foreground))"
            />
          </ReactFlow>
          
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
        </div>
        
        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-primary rounded-full animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Processing</h3>
            <p className="text-muted-foreground">AI processes your data streams in real-time, identifying patterns and opportunities instantly</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Smart Connections</h3>
            <p className="text-muted-foreground">Automatically discovers relationships between data points you never knew existed</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Predictive Insights</h3>
            <p className="text-muted-foreground">Machine learning algorithms predict future trends and recommend optimal actions</p>
          </div>
        </div>
      </div>
    </section>
  );
};