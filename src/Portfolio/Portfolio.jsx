import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaCode,
  FaBars,
  FaTimes,
  FaDatabase,
  FaTools,
  FaTerminal,
  FaExternalLinkAlt,
  FaFacebook,
  FaGraduationCap,
  FaHtml5,
  FaWhatsapp,
  FaRocket,
  FaDownload,
  FaArrowRight,
  FaUserLock,
  FaServer,
  FaBolt,
} from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiFigma,
  SiNextdotjs,
  SiGithub,
  SiCss3,
  SiExpress,
} from "react-icons/si";
import myImg from "../assets/300x300.jpg";
import { VscVscode } from "react-icons/vsc";

// --- Animation Variants ---
const modalContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// --- Sub-Component: Floating Icon ---
const FloatingIcon = ({ icon, delay, position }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-15, 15, -15] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
    className={`absolute ${position} p-3 md:p-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl text-xl md:text-2xl shadow-2xl z-20 hidden md:block`}
  >
    {icon}
  </motion.div>
);

// --- Skill Card Component ---
const SkillCard = ({ cat, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-10 transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>
      <div
        className="flex items-center gap-4 mb-12 relative z-10"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-all duration-500">
          {cat.icon}
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white group-hover:text-emerald-400 transition-colors">
          {cat.title}
        </h3>
      </div>
      <div
        className="grid grid-cols-2 gap-y-12 gap-x-6 relative z-10"
        style={{ transform: "translateZ(50px)" }}
      >
        {cat.skills.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-3 group/skill"
          >
            <div className="text-4xl text-slate-600 group-hover/skill:text-emerald-500 transition-all duration-300">
              {skill.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover/skill:text-white">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Project Modal Component ---
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl custom-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-slate-950/50 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-500 z-20 transition-all cursor-pointer"
        >
          <FaTimes size={24} />
        </button>
        <motion.div
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
          className="p-8 md:p-16"
        >
          <div className="mb-12">
            <span className="text-emerald-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">
              Project Showcase
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
              {project.title}
            </h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-6">
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-emerald-600 text-white py-5 rounded-2xl font-bold transition-all shadow-xl"
                >
                  Live Preview <FaExternalLinkAlt />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-slate-800 text-white py-5 rounded-2xl font-bold transition-all border border-slate-700"
                >
                  Source Code <FaGithub />
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-emerald-500"></span> Overview
                </h3>
                <p className="text-slate-400 leading-relaxed italic border-l-2 border-emerald-500/20 pl-6">
                  {project.description}
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-emerald-500"></span>{" "}
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-xl uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeNav, setActiveNav] = useState("home");

  const roles = [
    "Full Stack Developer",
    "React Specialist",
    "Full Stack Enthusiast",
    "Backend Architect",
  ];

  const data = {
    name: "Haridas Sarker",
    email: "horidassarker6@gmail.com",
    phone: "+880 1816553754",
    resumeLink:
      "https://drive.google.com/file/d/1tfuZ_WlE2uv-AQSkqMSb3vdoJpwRiKeA/view?usp=sharing",
    about:
      "Hi! I'm Haridas Sarker, a passionate Full Stack Developer with a love for building modern, scalable, and interactive web applications. Since 2021, I have been exploring MongoDB, Express.js, React, and Node.js to bring ideas to life with clean, performant code.",
    projects: [
      {
        title: "Food Delivery Platform",
        description:
          "A full-stack food delivery application with real-time order updates and smooth user interface",
        techStack: ["Next.js", "MongoDB", "Tailwind CSS", "NextAuth"],
        github: "https://github.com/HoridasPro/quickbite",
        link: "https://endgame-quickbite.vercel.app",
        image: "https://i.postimg.cc/yNH84s9Y/Screenshot-2026-04-17-232415.png",
      },
      {
        title: "PawMart",
        description:
          "A premium MERN e-commerce experience for pet essentials with real-time sync.",
        techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
        github: "https://github.com/HoridasPro/pawmart-project-assignment-10",
        link: "https://keen-douhuahoridas-7a20db.netlify.app",
        image: "https://i.postimg.cc/zB60g3f5/Screenshot-7.jpg",
      },
      {
        title: "Asset Verse",
        description:
          "Sophisticated asset management platform with real-time tracking and roles.",
        techStack: ["React", "Firebase", "Node.js", "Express", "MongoDB"],
        github:
          "https://github.com/HoridasPro/asset-verse-project-assignment-11",
        link: "https://stupendous-gumption-565b2dsmsagor123.netlify.app",
        image: "https://i.postimg.cc/X7DtgNDf/Screenshot-5.jpg",
      },
      {
        title: "Toy Zone",
        description:
          "A playful, responsive store for children's toys with full CRUD operations.",
        techStack: ["React", "Firebase", "Node.js", "Express", "MongoDB"],
        github:
          "https://github.com/HoridasPro/toy-platform-project-assignment-09",
        link: "https://inquisitive-brioche-e4fcedsmsagor1234.netlify.app",
        image: "https://i.postimg.cc/T1sQn12z/Screenshot-6.jpg",
      },
    ],
    skillsCategories: [
      {
        title: "Frontend",
        icon: <FaCode />,
        skills: [
          { name: "HTML5", icon: <FaHtml5 /> },
          { name: "Tailwind", icon: <SiTailwindcss /> },
          { name: "React", icon: <SiReact /> },
          { name: "JS", icon: <SiJavascript /> },
          { name: "Next.js", icon: <SiNextdotjs /> },
        ],
      },
      {
        title: "Backend",
        icon: <FaDatabase />,
        skills: [
          { name: "Node.js", icon: <SiNodedotjs /> },
          { name: "MongoDB", icon: <SiMongodb /> },
          { name: "Express.js", icon: <FaServer /> },
          { name: "Firebase", icon: <SiFirebase /> },
          { name: "APIs", icon: <FaTerminal /> },
          { name: "NextAuth", icon: <FaUserLock /> },
        ],
      },
      {
        title: "Tools",
        icon: <FaTools />,
        skills: [
          { name: "Vs Code", icon: <VscVscode /> },
          { name: "Git", icon: <SiGit /> },
          { name: "GitHub", icon: <SiGithub /> },
          { name: "Figma", icon: <SiFigma /> },
          { name: "Thander Client", icon: <FaBolt /> },
        ],
      },
    ],
    education: [
      {
        title: "B.Sc in Computer Science",
        school: "City University, Dhaka",
        date: "2021 — 2025",
      },
      {
        title: "MERN Stack Development",
        school: "Programming Hero",
        date: "2025",
      },
    ],
  };

  // Roles Animation
  useEffect(() => {
    const timer = setInterval(
      () => setRoleIndex((prev) => (prev + 1) % roles.length),
      3000,
    );
    return () => clearInterval(timer);
  }, [roles.length]);

  // Scroll Spy for Navbar
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "education",
      "contact",
    ];
    const observerOptions = { threshold: 0.6 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }

  return (
    <div className="bg-slate-950 text-slate-300 min-h-screen font-sans selection:bg-emerald-500/30">
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a
            href="#home"
            className="text-xl font-black tracking-tighter text-emerald-500 uppercase"
            whileHover={{ scale: 1.05 }}
          >
            {data.name}
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-900/50 p-1.5 rounded-full border border-slate-800">
            {[
              "home",
              "about",
              "skills",
              "projects",
              "education",
              "contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setActiveNav(item)}
                className={`relative px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
                  activeNav === item
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {activeNav === item && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-emerald-600 rounded-full -z-10"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                {item}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Home Section */}
      <header
        id="home"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-[20%] left-[10%] w-72 h-72 bg-emerald-600/20 rounded-full blur-[120px]"
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center z-10 w-full">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="inline-flex px-4 py-1.5 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="bg-emerald-600 rounded-full h-2 w-2"></span>
              </span>
              Available for Hire
            </motion.div>

            <h1 className="text-4xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
              Full{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic">
                Stack Developer
              </span>
            </h1>

            <div className="h-10 mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl md:text-3xl font-medium text-slate-400"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="text-slate-400 text-lg max-w-lg mb-10 leading-relaxed">
              I'm <span className="text-white font-bold">{data.name}</span>. I
              build robust, scalable, and visually stunning web applications.
            </p>

            {/* BUTTONS */}
            <motion.div
              className="flex flex-wrap gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#projects"
                className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-emerald-600/20"
              >
                View Projects <FaRocket />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href={data.resumeLink}
                className="px-8 py-4 border border-slate-700 text-slate-200 rounded-2xl font-bold flex items-center gap-2"
              >
                View Resume <FaDownload size={14} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute w-[110%] h-[110%] border border-slate-800 rounded-full animate-[spin_20s_linear_infinite] hidden md:block" />

            <FloatingIcon
              icon={<SiReact className="text-cyan-400" />}
              delay={0}
              position="top-0 -left-5"
            />
            <FloatingIcon
              icon={<SiNextdotjs className="text-white" />}
              delay={0}
              position="-top-30 left-30"
            />
            <FloatingIcon
              icon={<SiCss3 className="text-blue-500" />}
              delay={0}
              position="-top-35 left-90"
            />
            <FloatingIcon
              icon={<SiNodedotjs className="text-emerald-500" />}
              delay={1}
              position="-top-10 right-0"
            />
            <FloatingIcon
              icon={<SiTailwindcss className="text-sky-400" />}
              delay={1}
              position="top-45 right-140"
            />
            <FloatingIcon
              icon={<SiMongodb className="text-emerald-500" />}
              delay={2}
              position="bottom-0 -left-5"
            />
            <FloatingIcon
              icon={<SiExpress className="text-white" />}
              delay={2}
              position="-bottom-25 left-35"
            />
            <FloatingIcon
              icon={<SiJavascript className="text-yellow-400" />}
              delay={1.5}
              position="bottom-10 right-0"
            />
            <FloatingIcon
              icon={<SiFirebase className="text-yellow-400" />}
              delay={1.5}
              position="-bottom-20 right-35"
            />
            <FloatingIcon
              icon={<FaHtml5 className="text-orange-500" />}
              delay={1.5}
              position="bottom-45 left-140"
            />

            {/* IMAGE FLOAT ANIMATION */}
            <motion.div
              className="relative group"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-[3.5rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />

              <motion.div
                className="relative w-72 h-72 md:w-96 md:h-96 bg-slate-900 p-4 rounded-[4rem] border border-slate-800 overflow-hidden"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={myImg}
                  alt={data.name}
                  className="w-full h-full object-cover rounded-[3.2rem] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </header>
      {/* About Section */}

      <section
        id="about"
        className="py-24 px-6 relative overflow-hidden scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-black text-emerald-500 text-center mb-5"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          {/* Sub text */}
          <motion.p
            className="text-slate-400 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            A self-motivated developer who loves building real things and
            constantly learning
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Hello! 👋 I'm{" "}
            <span className="text-blue-400 font-semibold">{data.name}</span>, I
            started my web development journey out of curiosity, and now I truly
            enjoy building responsive and functional websites. I'm passionate
            about learning and growing every day as a developer.
          </motion.p>

          {/* Tagline */}
          <motion.div
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            🚀 Turning curiosity into code and code into real-world solutions
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Who I Am */}
            <motion.div
              className="p-8 rounded-2xl border border-blue-500/40 bg-slate-900/40"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <h3 className="text-white text-xl font-bold mb-4">Who I Am</h3>
              <ul className="text-slate-400 space-y-2">
                <li>• MERN Stack developer with a love for clean UI.</li>
                <li>
                  • React and Next.js is my comfort zone for building apps.
                </li>
                <li>• I keep learning and improving every day.</li>
              </ul>
            </motion.div>

            {/* What I Do */}
            <motion.div
              className="p-8 rounded-2xl border border-purple-500/40 bg-slate-900/40"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <h3 className="text-white text-xl font-bold mb-4">What I Do</h3>
              <ul className="text-slate-400 space-y-2">
                <li>
                  • Build responsive sites with HTML, CSS, JS, React, Next.js.
                </li>
                <li>
                  • Use backend tools like Node, MongoDB, Firebase, NextAuth.
                </li>
                <li>• Create projects to practice and grow skills.</li>
              </ul>
            </motion.div>

            {/* Goals */}
            <motion.div
              className="p-8 rounded-2xl border border-green-500/40 bg-slate-900/40"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <h3 className="text-white text-xl font-bold mb-4">My Goals</h3>
              <ul className="text-slate-400 space-y-2">
                <li>• Become a full-stack developer with real impact.</li>
                <li>• Work with a strong tech team on real projects.</li>
                <li>• Get a dev job and grow step by step.</li>
              </ul>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              className="p-8 rounded-2xl border border-orange-500/40 bg-slate-900/40"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <h3 className="text-white text-xl font-bold mb-4">
                My Philosophy
              </h3>
              <ul className="text-slate-400 space-y-2">
                <li>• Code should solve problems, not create them.</li>
                <li>• Keep it simple, clean, and easy to maintain.</li>
                <li>• Learning never stops in tech — keep going.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-emerald-500 text-center mb-5">
            Technical Skills
          </h2>
          <p className="text-slate-400 mt-6">
            My technical toolkit for building fast and efficient web solutions.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {data.skillsCategories.map((cat, index) => (
            <SkillCard key={index} cat={cat} index={index} />
          ))}
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center mb-20">
          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-black text-emerald-500 text-center mb-5"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-slate-400 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Real-world projects built with modern technologies, focusing on
            performance, usability, and scalability.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
            >
              {/* IMAGE */}
              <div className="h-72 overflow-hidden relative">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* OVERLAY */}
                <motion.div
                  className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 flex flex-col justify-center p-8"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-slate-300 text-sm mb-6 italic">
                    "{project.description}"
                  </p>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                  >
                    View Details <FaArrowRight />
                  </button>
                </motion.div>
              </div>

              {/* CONTENT */}
              <motion.div
                className="p-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
                  {project.title}
                </h3>

                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    className="text-slate-500 hover:text-white"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <FaGithub size={20} />
                  </motion.a>

                  <motion.a
                    href={project.link}
                    className="text-slate-500 hover:text-white"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                  >
                    <FaExternalLinkAlt size={18} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* --- Education Section --- */}
      <section id="education" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-emerald-500 text-center mb-5">
            Academic Path
          </h2>

          <div className="space-y-8 border-l border-slate-800 pl-6">
            {[
              {
                title: "B.Sc in Computer Science & Engineering (CSE)",
                school: "City University, Dhaka, Bangladesh",
                date: "2021 — 2025",
                desc: "Focused on software development, data structures, and modern web technologies. Built multiple academic and personal projects to strengthen practical knowledge.",
              },

              {
                title: "Higher Secondary Certificate (HSC)",
                school: "Belkuchi Model Degree College",
                date: "2017 — 2019",
                desc: "Completed higher secondary education with a focus on science. Developed strong analytical.",
              },
              {
                title: "Secondary School Certificate (SSC)",
                school: "Shohagpur S.K Pilot Model High School",
                date: "2014 — 2016",
                desc: "Built a strong academic foundation with interest in technology and logical thinking from an early stage.",
              },
              {
                title: "Full Stack Development",
                school: "Programming Hero",
                date: "2025-Present",
                desc: "Completed hands-on training in MERN stack development using MongoDB, Express, React, and Node.js with real-world project experience.",
              },
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[34px] top-3 w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>

                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] hover:border-emerald-500/40 transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <FaGraduationCap size={20} />
                      </div>

                      <h3 className="text-lg font-black text-white uppercase tracking-tight">
                        {edu.title}
                      </h3>
                    </div>

                    <span className="text-[10px] font-black bg-slate-800 text-slate-300 px-4 py-2 rounded-xl uppercase tracking-[0.2em]">
                      {edu.date}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm italic mb-2 ml-11">
                    {edu.school}
                  </p>

                  <p className="text-slate-500 text-sm leading-relaxed ml-11">
                    {edu.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="py-24 px-6 bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-emerald-500 mb-5"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Certificates
          </motion.h2>

          <motion.p
            className="text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            A collection of my learning achievements and completed courses in
            web development and programming.
          </motion.p>
        </div>

        {/* DATA ADDED HERE */}
        {(() => {
          const certificates = [
            {
              title: "Complete Full stack Web Development (MERN)",
              platform: "Programming Hero",
              image:
                "https://i.postimg.cc/CLQPHzFR/programing-hero-certificate.png",
              link: "https://drive.google.com/file/d/1LFFxbnPztFJv9zJbBfG_I3VU1pUlZL0l/view?usp=sharing",
            },
          ];

          return (
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  className="group bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* IMAGE */}
                  <div className="h-56 overflow-hidden">
                    <motion.img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 text-left">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {cert.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4">
                      {cert.platform}
                    </p>

                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-500 font-bold text-sm hover:underline flex items-center gap-2"
                    >
                      View Certificate →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })()}
      </section>

      <footer
        id="contact"
        className="py-24 px-6 bg-slate-950 border-t border-slate-900/50 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <motion.h2
            className="text-center text-4xl md:text-5xl font-black text-emerald-500 mb-5"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-slate-400 mb-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            A concise overview of my educational journey from school to SSC,
            building a strong foundation in computer science and
            problem-solving.
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase italic">
                Let's Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                  Something Great.
                </span>
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                I’m always open to discussing new projects, creative ideas or
                opportunities to be part of your visions. Let’s create something
                amazing together.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={`mailto:${data.email}`}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 transition text-white rounded-xl font-bold flex items-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaEnvelope /> Email Me
                </motion.a>

                <motion.a
                  href="https://wa.me/880XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-emerald-500 transition text-white rounded-xl font-bold flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaWhatsapp /> WhatsApp
                </motion.a>
              </div>

              {/* Social Cards */}
              <div className="grid grid-cols-2 gap-3 pt-6">
                {[
                  {
                    icon: <FaLinkedinIn size={18} />,
                    url: "https://linkedin.com/in/haridas-sarker-658970288",
                    label: "LinkedIn",
                  },
                  {
                    icon: <FaGithub size={18} />,
                    url: "https://github.com/HoridasPro",
                    label: "GitHub",
                  },
                  {
                    icon: <FaFacebook size={18} />,
                    url: "https://www.facebook.com/horidas.sarker.1",
                    label: "Facebook",
                  },
                  {
                    icon: <FaWhatsapp size={18} />,
                    url: "https://wa.me/880XXXXXXXXXX",
                    label: "WhatsApp",
                  },
                ].map((soc, i) => (
                  <motion.a
                    key={i}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <span className="text-slate-500 group-hover:text-emerald-500 transition">
                      {soc.icon}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white">
                      {soc.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* FORM */}
            <motion.form
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-5 bg-slate-900/30 border border-slate-800 p-8 rounded-3xl backdrop-blur-md"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message Sent!");
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">Contact Me</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  required
                />

                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                required
              />

              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                rows="6"
                placeholder="Your Message..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 resize-none"
                required
              />

              <motion.button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 transition text-white rounded-2xl font-bold shadow-lg cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Send Message 🚀
              </motion.button>
            </motion.form>
          </div>

          {/* BOTTOM */}
          <motion.div
            className="mt-24 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-[0.35em] text-slate-600 uppercase italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p>
              © {new Date().getFullYear()} {data.name.toUpperCase()} — ALL
              RIGHTS RESERVED
            </p>

            <div className="flex items-center gap-4">
              <span>{data.phone}</span>
              <motion.span
                className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span>Dhaka, Bangladesh</span>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-[60] bg-slate-950 flex flex-col items-center justify-center gap-8 text-2xl font-black uppercase tracking-widest"
          >
            <button
              className="absolute top-8 right-8"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaTimes />
            </button>
            {["about", "skills", "projects", "education", "contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveNav(item);
                  }}
                  className={`${activeNav === item ? "text-emerald-500" : "text-white"}`}
                >
                  {item}
                </a>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
