import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Intelligent Network Graph - Dynamic data visualization with real-time animations
// Shows interconnected business processes with intelligent flow patterns

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  color: string;
  connections: string[];
  activity: number;
  type: 'core' | 'process' | 'data';
}

interface Edge {
  source: string;
  target: string;
  strength: number;
  active: boolean;
}

// Helper function to get theme colors
const getThemeColor = (colorName: string, opacity = 1): string => {
  if (typeof window === 'undefined') return '#3b82f6';
  
  const root = document.documentElement;
  const style = getComputedStyle(root);
  
  let hslValue = '';
  switch (colorName) {
    case 'primary':
      hslValue = style.getPropertyValue('--primary').trim();
      break;
    case 'foreground':
      hslValue = style.getPropertyValue('--foreground').trim();
      break;
    case 'muted-foreground':
      hslValue = style.getPropertyValue('--muted-foreground').trim();
      break;
    case 'accent':
      hslValue = style.getPropertyValue('--accent').trim();
      break;
    case 'secondary':
      hslValue = style.getPropertyValue('--secondary').trim();
      break;
    default:
      hslValue = '221.2 83.2% 53.3%'; // fallback primary
  }
  
  return `hsl(${hslValue} / ${opacity})`;
};

const businessNodes = [
  { id: 'dashboard', label: 'Dashboard', type: 'core', color: 'primary', connections: ['invoices', 'appointments', 'analytics'] },
  { id: 'invoices', label: 'Invoices', type: 'process', color: 'muted-foreground', connections: ['payments', 'clients'] },
  { id: 'appointments', label: 'Schedule', type: 'process', color: 'foreground', connections: ['clients', 'calendar'] },
  { id: 'payments', label: 'Payments', type: 'data', color: 'accent', connections: ['analytics'] },
  { id: 'clients', label: 'Clients', type: 'core', color: 'primary', connections: ['analytics', 'communication'] },
  { id: 'analytics', label: 'Analytics', type: 'core', color: 'primary', connections: ['reports'] },
  { id: 'calendar', label: 'Calendar', type: 'data', color: 'secondary', connections: ['communication'] },
  { id: 'reports', label: 'Reports', type: 'process', color: 'muted-foreground', connections: ['communication'] },
  { id: 'communication', label: 'Communication', type: 'process', color: 'accent', connections: [] },
];

export function IntelligentNetworkGraph() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize nodes and edges
  useEffect(() => {
    const initNodes: Node[] = businessNodes.map((node, i) => {
      const angle = (i / businessNodes.length) * Math.PI * 2;
      const radius = Math.min(dimensions.width, dimensions.height) * 0.3;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      
      return {
        id: node.id,
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100,
        vx: 0,
        vy: 0,
        radius: node.type === 'core' ? 25 : node.type === 'process' ? 20 : 15,
        label: node.label,
        color: getThemeColor(node.color),
        connections: node.connections,
        activity: Math.random(),
        type: node.type as 'core' | 'process' | 'data'
      };
    });

    const initEdges: Edge[] = [];
    initNodes.forEach(node => {
      node.connections.forEach(targetId => {
        if (initNodes.find(n => n.id === targetId)) {
          initEdges.push({
            source: node.id,
            target: targetId,
            strength: Math.random() * 0.5 + 0.5,
            active: Math.random() > 0.3
          });
        }
      });
    });

    setNodes(initNodes);
    setEdges(initEdges);
  }, [dimensions]);

  // Intersection Observer to pause animation when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const canvas = canvasRef.current;
    if (canvas) observer.observe(canvas);
    
    return () => observer.disconnect();
  }, []);

  // Handle canvas resize - improved for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth < 1024;
        
        let width, height;
        
        if (isMobile) {
          width = Math.max(280, rect.width - 16);
          height = width * 0.75;
        } else if (isTablet) {
          width = Math.max(400, rect.width - 24);
          height = width * 0.7;
        } else {
          width = Math.max(500, rect.width - 32);
          height = Math.min(600, width * 0.75);
        }
        
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    // Multiple timeouts to handle different layout stages
    setTimeout(handleResize, 100);
    setTimeout(handleResize, 300);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Physics simulation - Optimized
  const updatePhysics = useMemo(() => (nodes: Node[], edges: Edge[]) => {
    const newNodes = [...nodes];
    
    // Apply forces with reduced intensity
    newNodes.forEach((node, i) => {
      let fx = 0, fy = 0;
      
      // Weaker gravitational center force
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const distToCenter = Math.sqrt((node.x - centerX) ** 2 + (node.y - centerY) ** 2);
      if (distToCenter > 0) {
        fx += (centerX - node.x) * 0.0001; // Reduced from 0.0002
        fy += (centerY - node.y) * 0.0001;
      }
      
      // Lighter repulsion between nodes
      newNodes.forEach((other, j) => {
        if (i === j) return;
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 120) { // Reduced from 150
          const force = 20 / (dist * dist); // Reduced from 30
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        }
      });
      
      // Weaker attraction along connections
      edges.forEach(edge => {
        if (edge.source === node.id) {
          const target = newNodes.find(n => n.id === edge.target);
          if (target) {
            const dx = target.x - node.x;
            const dy = target.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
              const force = edge.strength * 0.0005; // Reduced from 0.001
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
            }
          }
        }
      });
      
      // Stronger damping
      node.vx = (node.vx + fx) * 0.75; // Increased damping from 0.85
      node.vy = (node.vy + fy) * 0.75;
      
      // Update position
      node.x += node.vx;
      node.y += node.vy;
      
      // Boundary constraints
      const margin = node.radius;
      node.x = Math.max(margin, Math.min(dimensions.width - margin, node.x));
      node.y = Math.max(margin, Math.min(dimensions.height - margin, node.y));
      
      // Slower activity update for pulsing effect
      node.activity = Math.sin(Date.now() * 0.002 + i) * 0.3 + 0.7; // Reduced frequency and amplitude
    });
    
    return newNodes;
  }, [dimensions]);

  // Animation loop - Only when visible, optimized with reduced frequency
  useEffect(() => {
    if (!isVisible) return; // Pause when not visible
    
    let lastUpdate = 0;
    const frameRate = 1000 / 20; // 20 FPS for better performance
    
    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate >= frameRate) {
        setNodes(prevNodes => updatePhysics(prevNodes, edges));
        
        // Reduce edge update frequency even more
        if (Math.random() > 0.97) {
          setEdges(prevEdges => 
            prevEdges.map(edge => ({
              ...edge,
              active: Math.random() > 0.85 ? !edge.active : edge.active,
              strength: Math.max(0.3, Math.min(1, edge.strength + (Math.random() - 0.5) * 0.003))
            }))
          );
        }
        lastUpdate = timestamp;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [edges, isVisible]);

  // Drawing function - Optimized render frequency
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with proper pixel ratio handling
    const pixelRatio = window.devicePixelRatio || 1;
    const canvasWidth = dimensions.width * pixelRatio;
    const canvasHeight = dimensions.height * pixelRatio;
    
    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth; 
      canvas.height = canvasHeight;
      canvas.style.width = `${dimensions.width}px`;
      canvas.style.height = `${dimensions.height}px`;
      ctx.scale(pixelRatio, pixelRatio);
    }

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Draw background gradient - using theme colors
    const gradient = ctx.createRadialGradient(
      dimensions.width / 2, dimensions.height / 2, 0,
      dimensions.width / 2, dimensions.height / 2, Math.max(dimensions.width, dimensions.height) / 2
    );
    gradient.addColorStop(0, getThemeColor('primary', 0.02));
    gradient.addColorStop(1, getThemeColor('primary', 0.005));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Draw edges
    edges.forEach(edge => {
      const source = nodes.find(n => n.id === edge.source);
      const target = nodes.find(n => n.id === edge.target);
      
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        
        const opacity = edge.active ? edge.strength : edge.strength * 0.3;
        ctx.strokeStyle = getThemeColor('primary', opacity * 0.4);
        ctx.lineWidth = edge.active ? 1.5 : 0.8;
        ctx.stroke();
        
        // Animated data flow - using primary color
        if (edge.active) {
          const time = Date.now() * 0.005;
          const progress = (Math.sin(time + edge.strength * 10) + 1) / 2;
          const flowX = source.x + (target.x - source.x) * progress;
          const flowY = source.y + (target.y - source.y) * progress;
          
          ctx.beginPath();
          ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
          ctx.fillStyle = getThemeColor('primary');
          ctx.fill();
        }
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const isHovered = hoveredNode === node.id;
      const pulseScale = 1 + node.activity * 0.1;
      const radius = node.radius * (isHovered ? 1.2 : pulseScale);
      
      // Outer glow
      if (isHovered || node.activity > 0.7) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 10, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, radius + 10
        );
        glowGradient.addColorStop(0, `${node.color}40`);
        glowGradient.addColorStop(1, `${node.color}00`);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }
      
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      
      // Inner highlight
      ctx.beginPath();
      ctx.arc(node.x - radius * 0.3, node.y - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
      
      // Label - responsive font size
      if (isHovered || node.type === 'core') {
        ctx.fillStyle = getThemeColor('foreground');
        const fontSize = window.innerWidth < 640 ? 10 : 12;
        ctx.font = `bold ${fontSize}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y + radius + (window.innerWidth < 640 ? 16 : 20));
      }
    });
  }, [nodes, edges, dimensions, hoveredNode]);

  // Mouse interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let hoveredNodeId = null;
    for (const node of nodes) {
      const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      if (dist < node.radius + 10) {
        hoveredNodeId = node.id;
        break;
      }
    }
    
    setHoveredNode(hoveredNodeId);
  };

  return (
    <section aria-label="Business Process Network" className="relative bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left content */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 self-start order-2 lg:order-1">
            <header>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
                Intelligent Business Network
              </h2>
              <p className="mt-3 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-prose">
                Watch how FeatherBiz connects every aspect of your business in real-time. Each node represents a core process, with intelligent data flows optimizing your workflow automatically.
              </p>
            </header>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-card p-4">
                <div className="text-2xl font-bold text-primary">{nodes.length}</div>
                <div className="text-sm text-muted-foreground">Connected Processes</div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="text-2xl font-bold text-primary">{edges.filter(e => e.active).length}</div>
                <div className="text-sm text-muted-foreground">Active Data Flows</div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2">
              <div className="text-sm font-medium text-foreground">Node Types:</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
                <span>Core Systems</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                <span>Business Processes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Data Sources</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 space-y-3">
              <Button
                size="lg"
                onClick={() => navigate('/signup?trial=7d&source=network-graph')}
                className="w-full font-medium"
              >
                <span>Start For Free</span>
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Test free for 7 days. No credit card required.
              </p>
            </div>
          </aside>

          {/* Right graph */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-xl lg:rounded-2xl border bg-card shadow-sm overflow-hidden min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
              <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredNode(null)}
                className="w-full h-full cursor-pointer block"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 100%)',
                  minHeight: 'inherit'
                }}
              />
              
              {/* Hover tooltip - responsive positioning */}
              {hoveredNode && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-background/90 backdrop-blur-sm border rounded-lg p-2 sm:p-3 shadow-lg max-w-[180px] sm:max-w-[200px]">
                  <div className="font-medium text-xs sm:text-sm">
                    {nodes.find(n => n.id === hoveredNode)?.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {nodes.find(n => n.id === hoveredNode)?.type === 'core' ? 'Core System' :
                     nodes.find(n => n.id === hoveredNode)?.type === 'process' ? 'Business Process' : 'Data Source'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntelligentNetworkGraph;