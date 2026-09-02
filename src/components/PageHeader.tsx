import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  label: string;
  image: string;
}

export default function PageHeader({ title, subtitle, label, image }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-20 bg-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 to-stone-900/80" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-amber-400 font-medium text-sm tracking-normal"
        >
          {label}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-6xl font-bold text-white mt-2"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-stone-300 text-lg mt-4 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
