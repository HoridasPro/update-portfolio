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
  SiPostman,
} from "react-icons/si";
import myImg from "../assets/300x300.jpg";

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
          className="absolute top-8 right-8 p-3 bg-slate-950/50 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-500 z-20 transition-all"
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
    "MERN Stack Developer",
    "React Specialist",
    "Full Stack Enthusiast",
    "Backend Architect",
  ];

  const data = {
    name: "Haridas Sarker",
    email: "horidassarker6@gmail.com",
    phone: "+880 1816553754",
    // whatsapp: "+8801816553754",
    resumeLink:
      "https://drive.google.com/file/d/10VS4UHcQVaN3WC5XVRZp7gmzpry4iO2A/view?usp=sharing",
    about:
      "Hi! I'm Haridas Sarker, a passionate MERN Stack Developer with a love for building modern, scalable, and interactive web applications. Since 2021, I have been exploring MongoDB, Express.js, React, and Node.js to bring ideas to life with clean, performant code.",
    projects: [
      {
        title: "Food Delivery Platform",
        description:
          "A full-stack MERN food delivery application with real-time order updates and smooth user interface",
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
          { name: "React", icon: <SiReact /> },
          { name: "JS", icon: <SiJavascript /> },
          { name: "Tailwind", icon: <SiTailwindcss /> },
          { name: "HTML5", icon: <FaHtml5 /> },
        ],
      },
      {
        title: "Backend",
        icon: <FaDatabase />,
        skills: [
          { name: "Node.js", icon: <SiNodedotjs /> },
          { name: "MongoDB", icon: <SiMongodb /> },
          { name: "Firebase", icon: <SiFirebase /> },
          { name: "APIs", icon: <FaTerminal /> },
        ],
      },
      {
        title: "Tools",
        icon: <FaTools />,
        skills: [
          { name: "Git", icon: <SiGit /> },
          { name: "Postman", icon: <SiPostman /> },
          { name: "Figma", icon: <SiFigma /> },
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
      {/* --- UPDATED NAVBAR --- */}
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
            {["about", "skills", "projects", "education", "contact"].map(
              (item) => (
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
              ),
            )}
          </div>

          <button
            className="md:hidden text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-emerald-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="bg-emerald-600 rounded-full h-2 w-2"></span>
              </span>
              Available for Hire
            </motion.div>
            <h1 className="text-4xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
              MERN{" "}
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
            <div className="flex flex-wrap gap-5">
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
                Resume <FaDownload size={14} />
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute w-[110%] h-[110%] border border-slate-800 rounded-full animate-[spin_20s_linear_infinite] hidden md:block" />
            <FloatingIcon
              icon={<SiReact className="text-cyan-400" />}
              delay={0}
              position="top-0 left-0"
            />
            <FloatingIcon
              icon={<SiNodedotjs className="text-emerald-500" />}
              delay={1}
              position="top-0 right-0"
            />
            <FloatingIcon
              icon={<SiMongodb className="text-emerald-500" />}
              delay={2}
              position="bottom-0 left-10"
            />
            <FloatingIcon
              icon={<SiJavascript className="text-yellow-400" />}
              delay={1.5}
              position="bottom-10 right-0"
            />
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500 rounded-[3.5rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 bg-slate-900 p-4 rounded-[4rem] border border-slate-800 overflow-hidden">
                <img
                  src={myImg}
                  alt={data.name}
                  className="w-full h-full object-cover rounded-[3.2rem] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            Recent Masterpieces
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Featured <span className="text-emerald-600">Projects.</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)]"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="group relative bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden"
            >
              <div className="h-72 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center p-8">
                  <p className="text-slate-300 text-sm mb-6 italic">
                    "{project.description}"
                  </p>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
                  >
                    View Details <FaArrowRight />
                  </button>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
                  {project.title}
                </h3>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="text-slate-500 hover:text-white"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href={project.link}
                    className="text-slate-500 hover:text-white"
                  >
                    <FaExternalLinkAlt size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Arsenal Section */}
      <section id="skills" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block">
            My Mastery
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Technical <span className="text-emerald-500">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)]"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {data.skillsCategories.map((cat, index) => (
            <SkillCard key={index} cat={cat} index={index} />
          ))}
        </div>
      </section>

      {/* --- About & Education Section --- */}
      <section
        id="about"
        className="py-24 px-6 relative overflow-hidden scroll-mt-20"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block">
                  Introduction
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                  Who is <span className="text-emerald-600">Haridas?</span>
                </h2>
                <div className="w-20 h-1 bg-emerald-600 mt-6 rounded-full"></div>
              </div>
              <div className="relative p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] backdrop-blur-sm group hover:border-emerald-500/30 transition-all duration-500">
                <p className="text-xl text-slate-400 leading-relaxed italic relative z-10">
                  "{data.about}"
                </p>
                <span className="absolute -top-6 -left-2 text-8xl text-emerald-500/10 font-serif select-none pointer-events-none">
                  “
                </span>
              </div>
            </motion.div>

            <div id="education" className="space-y-6 scroll-mt-20">
              <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block">
                Academic Path
              </span>
              {data.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="group relative p-8 bg-slate-900/30 border border-slate-800 rounded-[2rem] hover:bg-slate-900/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                          <FaGraduationCap size={20} />
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                          {edu.title}
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm italic ml-11">
                        {edu.school}
                      </p>
                    </div>
                    <span className="text-[10px] font-black bg-slate-800 text-slate-300 px-4 py-2 rounded-xl uppercase tracking-[0.2em] group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      {edu.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer / Let's Connect Section --- */}
      <footer
        id="contact"
        className="py-24 px-6 bg-slate-950 relative border-t border-slate-900/50 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
                Let's Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                  Greatness.
                </span>
              </h2>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ y: -5 }}
                  href={`mailto:${data.email}`}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl"
                >
                  <FaEnvelope /> Email Me
                </motion.a>
                <motion.a
                  whileHover={{ y: -5 }}
                  href="https://call.whatsapp.com/video/PHZ3cxjyQY0oit5st7Wwdr"
                  className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl"
                >
                  <FaWhatsapp /> WhatsApp
                </motion.a>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <FaLinkedinIn size={24} />,
                  url: "https://linkedin.com/in/haridas-sarker-658970288",
                  label: "LinkedIn",
                },
                {
                  icon: <FaGithub size={24} />,
                  url: "https://github.com/HoridasPro",
                  label: "Github",
                },
                {
                  icon: <FaFacebook size={24} />,
                  url: "https://www.facebook.com/horidas.sarker.1",
                  label: "Facebook",
                },
                {
                  icon: <FaWhatsapp size={24} />,
                  url: "https://call.whatsapp.com/video/PHZ3cxjyQY0oit5st7Wwdr",
                  label: "What's App",
                },
              ].map((soc, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  href={soc.url}
                  className="flex flex-col items-center justify-center p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all group"
                >
                  <div className="text-slate-500 group-hover:text-emerald-500 mb-4">
                    {soc.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-white">
                    {soc.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-[0.4em] text-slate-700 uppercase italic">
            <p className="flex mx-auto">
              © {new Date().getFullYear()} {data.name.toUpperCase()} —
              ARCHITECTING THE FUTURE
            </p>
            <div className="flex items-center gap-6">
              <span className="text-slate-500">{data.phone}</span>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-slate-500">Dhaka, Bangladesh</span>
            </div>
          </div>
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
