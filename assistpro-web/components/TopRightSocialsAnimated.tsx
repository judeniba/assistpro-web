"use client";

import { motion } from "framer-motion";
import { Globe, Music, Users, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Social = { icon: LucideIcon; href: string; name: string };

export default function TopRightSocialsAnimated({
  ready = false,
}: {
  ready?: boolean;
}) {
  const socials: Social[] = [
    { icon: Globe,     href: "https://instagram.com/assistpro",        name: "Instagram" },
    { icon: Music,     href: "https://tiktok.com/@assistpro",          name: "TikTok" },
    { icon: Users,     href: "https://facebook.com/assistpro",         name: "Facebook" },
    { icon: Briefcase, href: "https://linkedin.com/company/assistpro", name: "LinkedIn" },
  ];

  const container = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.06,
        delayChildren: 0.18,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={ready ? "show" : "hidden"}
      className="fixed top-20 right-6 z-50 flex items-center gap-3"
    >
      {socials.map((s) => (
        <motion.a
          key={s.name}
          variants={item}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.name}
          className="socialGlow group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur text-white/80 hover:bg-black/70"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <s.icon size={16} strokeWidth={2} className="goldHover" />
        </motion.a>
      ))}
    </motion.div>
  );
}
