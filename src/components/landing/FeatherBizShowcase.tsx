import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Animation variants - simplified for TypeScript compatibility
const containerVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const childVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

// Mock data for demonstrations
const pipelineData = [
  {
    column: "Leads",
    color: "hsl(var(--fb-blue))",
    count: 12,
    cards: [
      { title: "Acme Corp", type: "Enterprise", priority: "high" },
      { title: "TechStart Inc", type: "Pro", priority: "medium" },
      { title: "Local Biz", type: "Plus", priority: "low" }
    ]
  },
  {
    column: "Qualified",
    color: "hsl(var(--fb-orange))",
    count: 8,
    cards: [
      { title: "BigCorp Ltd", type: "Enterprise", priority: "high" },
      { title: "StartupXYZ", type: "Pro", priority: "medium" }
    ]
  },
  {
    column: "Proposals",
    color: "hsl(var(--fb-violet))",
    count: 5,
    cards: [
      { title: "MegaCorp", type: "Enterprise", priority: "high" },
      { title: "SmallBiz Co", type: "Plus", priority: "medium" }
    ]
  },
  {
    column: "Closed",
    color: "hsl(var(--fb-green))",
    count: 3,
    cards: [
      { title: "SuccessCorp", type: "Enterprise", priority: "high" }
    ]
  }
];

const workflowMetrics = [
  { label: "Active Workflows", value: 24 },
  { label: "Tasks Completed", value: 1847 },
  { label: "Time Saved", value: 156 },
  { label: "Success Rate", value: 94 }
];

const chartData = [
  { month: 'Jan', Plus: 45, Pro: 78, Enterprise: 23 },
  { month: 'Feb', Plus: 52, Pro: 85, Enterprise: 29 },
  { month: 'Mar', Plus: 48, Pro: 92, Enterprise: 35 },
  { month: 'Apr', Plus: 61, Pro: 98, Enterprise: 42 },
  { month: 'May', Plus: 55, Pro: 105, Enterprise: 48 },
  { month: 'Jun', Plus: 67, Pro: 112, Enterprise: 54 }
];

const pieData = [
  { name: 'Plus', value: 328, fill: 'var(--fb-orange)' },
  { name: 'Pro', value: 570, fill: 'var(--fb-violet)' },
  { name: 'Enterprise', value: 231, fill: 'var(--fb-blue)' }
];

const tabs = [
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'notes', label: 'Notes' },
  { id: 'metrics', label: 'Business Metrics' }
];

export const FeatherBizShowcase = () => {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll for pipeline
  useEffect(() => {
    if (activeTab !== 'pipeline') return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveTab(tabId);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      const nextIndex = event.key === 'ArrowRight' 
        ? (currentIndex + 1) % tabs.length 
        : (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariant}
      className="py-[var(--section-y)]"
      style={{ backgroundColor: 'var(--fb-bg)' }}
    >
      <div className="max-w-[var(--container)] mx-auto px-[var(--px)]">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            variants={childVariant}
            className="text-[36px] leading-[1.15] md:text-[48px] font-extrabold mb-4"
            style={{ color: 'var(--fb-text)' }}
          >
            Built for business growth
          </motion.h2>
          <motion.p 
            variants={childVariant}
            className="text-[18px] max-w-2xl mx-auto"
            style={{ color: 'var(--fb-muted)' }}
          >
            See how FeatherBiz transforms the way you manage pipelines, automate workflows, and track business metrics.
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div variants={childVariant} className="flex justify-center mb-8">
          <div 
            role="tablist"
            className="inline-flex p-1 rounded-xl border"
            style={{ 
              backgroundColor: 'var(--fb-surface)',
              borderColor: 'var(--fb-border)'
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                tabIndex={activeTab === tab.id ? 0 : -1}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 min-h-[44px] ${
                  activeTab === tab.id 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
                style={{
                  color: activeTab === tab.id ? 'var(--fb-text)' : 'var(--fb-muted)',
                  boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {activeTab === 'pipeline' && <PipelinePreview data={pipelineData} />}
            {activeTab === 'workflows' && <WorkflowsPreview metrics={workflowMetrics} />}
            {activeTab === 'notes' && <NotesPreview />}
            {activeTab === 'metrics' && <MetricsPreview chartData={chartData} pieData={pieData} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

// Pipeline Component
const PipelinePreview = ({ data }: { data: any[] }) => (
  <motion.div
    variants={staggerChildren}
    initial="hidden"
    animate="visible"
    className="bg-white rounded-[20px] border p-5 overflow-hidden"
    style={{ 
      borderColor: 'var(--fb-border)',
      boxShadow: 'var(--shadow-sm)'
    }}
  >
    <div className="flex gap-4 overflow-x-auto pb-4">
      {data.map((column, index) => (
        <motion.div
          key={column.column}
          variants={childVariant}
          className="min-w-[280px] flex-shrink-0"
        >
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: column.color }}
            />
            <h3 className="font-semibold text-sm" style={{ color: 'var(--fb-text)' }}>
              {column.column}
            </h3>
            <span 
              className="text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: 'var(--fb-border)',
                color: 'var(--fb-muted)'
              }}
            >
              {column.count}
            </span>
          </div>
          <div className="space-y-3">
            {column.cards.map((card: any, cardIndex: number) => (
              <motion.div
                key={cardIndex}
                variants={childVariant}
                className="p-3 rounded-xl border bg-white hover:shadow-sm transition-all duration-200"
                style={{ borderColor: 'var(--fb-border)' }}
              >
                <h4 className="font-medium text-sm mb-2" style={{ color: 'var(--fb-text)' }}>
                  {card.title}
                </h4>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs px-2 py-1 rounded-full border"
                    style={{
                      borderColor: 'var(--fb-border)',
                      color: 'var(--fb-muted)'
                    }}
                  >
                    {card.type}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      card.priority === 'high' ? 'bg-red-400' :
                      card.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Workflows Component
const WorkflowsPreview = ({ metrics }: { metrics: any[] }) => (
  <motion.div
    variants={staggerChildren}
    initial="hidden"
    animate="visible"
    className="bg-white rounded-[20px] border p-5"
    style={{ 
      borderColor: 'var(--fb-border)',
      boxShadow: 'var(--shadow-sm)',
      backgroundImage: 'radial-gradient(#EEF2F7 1px, transparent 1px)',
      backgroundSize: '16px 16px'
    }}
  >
    <div className="grid md:grid-cols-2 gap-6">
      {/* Workflow Editor */}
      <div className="space-y-4">
        <h3 className="font-semibold mb-4" style={{ color: 'var(--fb-text)' }}>
          Workflow Editor
        </h3>
        {[
          { title: 'Lead Capture', status: 'Triggered', color: 'var(--fb-blue)' },
          { title: 'Email Sequence', status: 'Running', color: 'var(--fb-orange)' },
          { title: 'Follow-up Tasks', status: 'Pending', color: 'var(--fb-muted)' }
        ].map((block, index) => (
          <motion.div
            key={index}
            variants={childVariant}
            className="p-4 rounded-xl border bg-white"
            style={{ borderColor: 'var(--fb-border)' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm" style={{ color: 'var(--fb-text)' }}>
                {block.title}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: block.color === 'var(--fb-muted)' ? 'var(--fb-border)' : `${block.color}20`,
                  color: block.color
                }}
              >
                {block.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Metrics Panel */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            variants={childVariant}
            className="p-4 rounded-xl border bg-white text-center"
            style={{ borderColor: 'var(--fb-border)' }}
          >
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--fb-text)' }}>
              <AnimatedNumber 
                value={metric.value} 
                duration={900}
                suffix={metric.label.includes('Rate') ? '%' : metric.label.includes('Time') ? 'h' : ''}
              />
            </div>
            <div className="text-xs" style={{ color: 'var(--fb-muted)' }}>
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Notes Component  
const NotesPreview = () => (
  <motion.div
    variants={staggerChildren}
    initial="hidden"
    animate="visible"
    className="bg-white rounded-[20px] border p-5"
    style={{ 
      borderColor: 'var(--fb-border)',
      boxShadow: 'var(--shadow-sm)'
    }}
  >
    <div className="max-w-[920px] mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--fb-text)' }}>
          Q3 Business Review
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Revenue Growth', 'Team Expansion', 'Product Launch'].map((tag, index) => (
            <motion.span
              key={tag}
              variants={childVariant}
              className="text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: 'var(--fb-border)',
                backgroundColor: index === 0 ? 'var(--fb-green-10)' : 
                                index === 1 ? 'var(--fb-blue-10)' : 'var(--fb-orange-10)',
                color: 'var(--fb-text)'
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
      
      <div className="prose prose-sm max-w-none" style={{ color: 'var(--fb-text)' }}>
        <p style={{ color: 'var(--fb-muted)' }}>
          Our Q3 performance shows strong momentum across all key metrics. Revenue increased by 34% compared to last quarter, driven primarily by our Enterprise tier adoption...
        </p>
      </div>

      <motion.div
        variants={childVariant}
        className="mt-6 p-4 rounded-lg border-l-4 bg-gray-50"
        style={{ borderLeftColor: 'var(--fb-blue)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="h-4 w-4" style={{ color: 'var(--fb-blue)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--fb-text)' }}>
            Attachment: Q3_Financial_Report.pdf
          </span>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Metrics Component
const MetricsPreview = ({ chartData, pieData }: { chartData: any[]; pieData: any[] }) => {
  const total = pieData.reduce((sum, entry) => sum + entry.value, 0);
  
  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-[20px] border p-5"
      style={{ 
        borderColor: 'var(--fb-border)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Bar Chart */}
        <motion.div variants={childVariant}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--fb-text)' }}>
            Growth by Plan
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" />
              <XAxis 
                dataKey="month"
                tick={{ fill: 'var(--fb-muted)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: 'var(--fb-muted)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  background: '#fff',
                  border: '1px solid var(--fb-border)',
                  boxShadow: 'var(--shadow-sm)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="Plus" fill="var(--fb-orange)" radius={8} />
              <Bar dataKey="Pro" fill="var(--fb-violet)" radius={8} />
              <Bar dataKey="Enterprise" fill="var(--fb-blue)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={childVariant}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--fb-text)' }}>
            Plan Distribution
          </h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid var(--fb-border)',
                    boxShadow: 'var(--shadow-sm)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--fb-text)' }}>
                  <AnimatedNumber value={total} duration={900} />
                </div>
                <div className="text-sm" style={{ color: 'var(--fb-muted)' }}>
                  Total Users
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center flex-wrap gap-4 mt-4">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="text-sm" style={{ color: 'var(--fb-muted)' }}>
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};