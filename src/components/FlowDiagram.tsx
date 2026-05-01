import { motion } from 'framer-motion';

export interface FlowNode {
  label: string;
  icon: string;
  isEngine?: boolean;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  feedbackLoop?: boolean;
}

export const FlowDiagram = ({ nodes, feedbackLoop = false }: FlowDiagramProps) => {
  return (
    <div className="relative w-full py-8">
      {/* Main flow */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
        {nodes.map((node, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center">
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`relative flex flex-col items-center gap-2 px-6 py-5 rounded-xl border transition-all duration-500 min-w-[140px] ${
                node.isEngine
                  ? 'bg-gradient-to-b from-[#C87533]/20 to-[#C87533]/5 border-[#C87533]/40 shadow-[0_0_30px_rgba(200,117,51,0.15)]'
                  : 'glass border-white/10'
              }`}
            >
              {/* Glow pulse on engine node */}
              {node.isEngine && (
                <div className="absolute inset-0 rounded-xl bg-[#C87533]/10 animate-pulse pointer-events-none" />
              )}
              <span className="text-2xl">{node.icon}</span>
              <span className={`text-xs font-mono tracking-wider uppercase text-center leading-tight ${
                node.isEngine ? 'text-[#C87533] font-semibold' : 'text-text-muted'
              }`}>
                {node.label}
              </span>
            </motion.div>

            {/* Connector arrow */}
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center mx-1"
              >
                {/* Horizontal arrow (desktop) */}
                <div className="hidden md:flex items-center">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-[#C87533]/60 to-[#C87533]/20" />
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#C87533]/60" />
                </div>
                {/* Vertical arrow (mobile) */}
                <div className="flex md:hidden flex-col items-center">
                  <div className="h-6 w-[2px] bg-gradient-to-b from-[#C87533]/60 to-[#C87533]/20" />
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[#C87533]/60" />
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Feedback loop */}
      {feedbackLoop && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="hidden md:flex items-center justify-center mt-4"
        >
          <div className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-[#C87533]/20 bg-[#C87533]/5">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-sm"
            >
              🧠
            </motion.span>
            <span className="font-mono text-[10px] tracking-widest text-[#C87533] uppercase">
              System learns from every correction → gets smarter over time
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="text-xs text-[#C87533]"
            >
              ↻
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
