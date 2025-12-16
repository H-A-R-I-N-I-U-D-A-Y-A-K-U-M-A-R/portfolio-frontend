import { useState, useEffect, Suspense } from "react";
import emailjs from "emailjs-com";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text, Sparkles } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

function Portfolio3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      className="w-full h-96 rounded-3xl"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* Removed the Float + meshes that showed React / Node.js */}
        <OrbitControls enableZoom={false} />
        <Sparkles count={100} scale={8} />
      </Suspense>
    </Canvas>
  );
}

function FeatureCard({ title, description, iconBg, icon }) {
  return (
    <div
      className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 shadow-lg
                 transform transition-transform duration-300 ease-out
                 hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                      bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10
                      transition-opacity duration-300" />
      <div className="relative">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconBg}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-3 text-white">{title}</h3>
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [],
    github: "",
    demo: "",
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const USER_ID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const TO_EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL;
    
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
          to_email: TO_EMAIL,
        },
        USER_ID
      )
      .then(
        () => {
          setContactForm({ name: "", email: "", message: "" });
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("Email error:", error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  const skills = [
      "Java",
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "SQL",
      "HTML & CSS",
      "Tailwind CSS",
      "Figma",
      "GSAP",
      "EmailJS",
      "Git & GitHub",
      "REST APIs",
      "Airflow",
      "Docker",
  ];

  const featuredProjects = [
    {
      title: "Spotify Data Pipeline",
      subtitle: "Music Analytics Data Pipeline",
      description:
        "Built an end‑to‑end music analytics pipeline with Python and Spotipy that ingests Spotify track metadata, loads it into MySQL, and powers visual reports on popularity trends and track duration using Pandas, Matplotlib, and Apache Airflow.",
      tags: [
        "Python",
        "Spotipy",
        "MySQL",
        "Pandas",
        "Matplotlib",
        "Apache Airflow",
        "Data Engineering",
      ],
    },
    {
      title: "InstaNotify AI",
      subtitle: "Real‑Time Notification Intelligence",
      description:
        "Developed real‑time notification analytics with Flask, Firebase messaging, and MySQL, enhanced with BERT sentiment analysis, CV‑style engagement profiling, and a RAG bot to deliver deeper retention insights.",
      tags: [
        "Python",
        "Flask",
        "Firebase",
        "MySQL",
        "BERT",
        "Transformers",
        "RAG",
        "Analytics",
      ],
    },
    {
      title: "Split Budget",
      subtitle: "Intelligent Expense Splitting Platform",
      description:
        "Implemented a full‑stack expense tracker with Java Spring Boot, React, and real‑time bill splits, orchestrated with Airflow and Docker. Added XGBoost churn prediction and a LangChain‑powered chatbot to reduce manual reconciliation via interactive dashboards.",
      tags: [
        "Java",
        "Spring Boot",
        "React",
        "MySQL",
        "Apache Airflow",
        "Docker",
        "XGBoost",
        "LangChain",
      ],
    },
  ];

  const aboutFeatures = [
    {
      title: "Java Development",
      description:
        "Building backend services and robust applications using Java and modern frameworks.",
      iconBg: "bg-blue-500/15",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8"
          fill="#000000"
        >
          <title>java</title>
          <path d="M13.168 30.901c5.401 0.346 13.695-0.191 13.891-2.747 0 0-0.377 0.968-4.464 1.738-2.257 0.407-4.855 0.639-7.508 0.639-2.173 0-4.309-0.156-6.398-0.457l0.239 0.028c0-0.001 0.691 0.571 4.24 0.799zM19 1.004s3.117 3.117-2.955 7.91c-4.869 3.845-1.11 6.038-0.001 8.543-2.842-2.566-4.927-4.821-3.529-6.922 2.054-3.085 7.744-4.58 6.486-9.531zM22.393 22.978c5.627-2.924 3.025-5.735 1.21-5.355-0.249 0.047-0.465 0.107-0.674 0.182l0.030-0.009c0.119-0.167 0.283-0.296 0.474-0.369l0.007-0.002c3.593-1.263 6.356 3.725-1.16 5.701 0.046-0.041 0.084-0.090 0.111-0.145l0.001-0.003zM12.616 17.512s-5.451 1.295-1.929 1.764c0.948 0.078 2.052 0.122 3.166 0.122 1.424 0 2.831-0.073 4.218-0.214l-0.174 0.014c2.257-0.19 4.521-0.596 4.521-0.596-0.531 0.232-0.982 0.477-1.409 0.756l0.037-0.022c-5.535 1.456-16.228 0.779-13.149-0.71 1.357-0.703 2.963-1.115 4.665-1.115 0.019 0 0.038 0 0.057 0h-0.003zM25.16 26.627s0.849 0.699-0.933 1.238c-3.389 1.027-14.106 1.336-17.081 0.041-1.070-0.466 0.937-1.112 1.567-1.247 0.291-0.074 0.626-0.117 0.97-0.117 0.023 0 0.045 0 0.068 0.001l-0.003-0c-1.191-0.839-7.693 1.646-3.303 2.358 11.972 1.941 21.821-0.875 18.716-2.274zM17.395 15.344c0.314 0.377 0.505 0.868 0.505 1.402 0 0.719-0.346 1.358-0.88 1.759l-0.006 0.004s3.673-1.897 1.986-4.271c-1.576-2.214-2.784-3.314 3.758-7.108 0-0.001-10.267 2.563-5.363 8.214zM11.346 20.915s-1.285 0.951 0.677 1.155c0.859 0.108 1.852 0.169 2.86 0.169 1.826 0 3.605-0.202 5.315-0.585l-0.162 0.030c0.344 0.322 0.755 0.578 1.209 0.744l0.025 0.008c-7.097 2.076-15.004 0.162-9.925-1.522zM12.065 24.198s-1.146 0.667 0.816 0.892c0.719 0.107 1.548 0.168 2.392 0.168 1.354 0 2.671-0.157 3.934-0.455l-0.116 0.023c0.467 0.285 1.010 0.557 1.577 0.782l0.074 0.026c-5.872 2.516-13.287-0.147-8.676-1.436z" />
        </svg>
      ),
    },
    
    {
      title: "Data Engineering",
      description:
        "Building reliable data pipelines and storage systems that convert raw, multi-source data into structured datasets for analytics and machine learning.",
      iconBg: "bg-purple-500/15",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8"
        >
          <style type="text/css">
            {`.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}
          </style>
          <ellipse className="st0" cx="14" cy="8" rx="10" ry="5" />
          <g>
            <ellipse cx="14" cy="8" rx="11" ry="6" />
            <path d="M14,24c-4.8,0-8.8-1.4-11-3.6V24c0,3.4,4.8,6,11,6c0.9,0,1.8-0.1,2.7-0.2C15.2,28.3,14.3,26.2,14,24C14,24,14,24,14,24z" />
            <path d="M3,12.4V16c0,3.4,4.8,6,11,6c0,0,0,0,0.1,0c0.2-2.4,1.4-4.6,3-6.2c-1,0.1-2,0.2-3.1,0.2C9.2,16,5.2,14.6,3,12.4z" />
          </g>
          <path d="M31.7,20.9c-0.1-0.5-0.7-0.8-1.2-0.7c-0.7,0.2-1.2,0-1.3-0.2c-0.1-0.2,0-0.7,0.5-1.3c0.4-0.4,0.4-1,0-1.4
            c-1-1-2.2-1.7-3.6-2.1c-0.5-0.1-1.1,0.2-1.2,0.7c-0.2,0.7-0.6,1-0.9,1s-0.6-0.4-0.9-1c-0.2-0.5-0.7-0.8-1.2-0.7
            c-1.4,0.4-2.6,1.1-3.6,2.1c-0.4,0.4-0.4,1,0,1.4c0.5,0.5,0.6,1,0.5,1.3c-0.1,0.2-0.6,0.4-1.3,0.2c-0.5-0.1-1.1,0.2-1.2,0.7
            C16.1,21.6,16,22.3,16,23s0.1,1.4,0.3,2.1c0.1,0.5,0.7,0.8,1.2,0.7c0.7-0.2,1.2,0,1.3,0.2c0.1,0.2,0,0.7-0.5,1.3
            c-0.4,0.4-0.4,1,0,1.4c1,1,2.2,1.7,3.6,2.1c0.5,0.1,1.1-0.2,1.2-0.7c0.2-0.7,0.6-1,0.9-1s0.6,0.4,0.9,1c0.1,0.4,0.5,0.7,1,0.7
            c0.1,0,0.2,0,0.3,0c1.4-0.4,2.6-1.1,3.6-2.1c0.4-0.4,0.4-1,0-1.4c-0.5-0.5-0.6-1-0.5-1.3c0.1-0.2,0.6-0.4,1.3-0.2
            c0.5,0.1,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.4,0.3-2.1S31.9,21.6,31.7,20.9z M24,26c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S25.7,26,24,26
            z" />
        </svg>
      ),
    },

    {
      title: "Machine Learning",
      description:
        "Designing and deploying ML models that power intelligent applications.",
      iconBg: "bg-purple-500/15",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8"
          fill="#000000"
        >
          <path d="M12,30.36c-1.47,0-2.852-0.766-3.653-2.011C5.703,28.24,3.64,26.106,3.64,23.5
            c0-0.899,0.252-1.771,0.733-2.544C2.678,19.887,1.64,18.021,1.64,16s1.038-3.886,2.733-4.957C3.893,10.271,3.64,9.4,3.64,8.5
            c0-2.63,2.101-4.779,4.712-4.858C9.155,2.402,10.534,1.64,12,1.64c2.404,0,4.36,1.956,4.36,4.36v4.64H25
            c0.904,0,1.64-0.736,1.64-1.64V7.312c-0.575-0.158-1-0.686-1-1.312c0-0.75,0.61-1.36,1.36-1.36S28.36,5.25,28.36,6
            c0,0.625-0.425,1.153-1,1.312V9c0,1.301-1.059,2.36-2.36,2.36h-8.64v2.28h11.329c0.158-0.576,0.687-1,1.312-1
            c0.75,0,1.36,0.61,1.36,1.36s-0.61,1.36-1.36,1.36c-0.625,0-1.153-0.424-1.312-1H16.36v3.28h11.329c0.158-0.575,0.687-1,1.312-1
            c0.75,0,1.36,0.61,1.36,1.36s-0.61,1.36-1.36,1.36c-0.625,0-1.153-0.425-1.312-1H16.36v2.279H25c1.302,0,2.36,1.059,2.36,2.36v1.688
            c0.575,0.158,1,0.687,1,1.312c0,0.75-0.61,1.36-1.36,1.36s-1.36-0.61-1.36-1.36c0-0.625,0.425-1.153,1-1.312V23
            c0-0.904-0.735-1.64-1.64-1.64h-8.64V26C16.36,28.404,14.404,30.36,12,30.36z M8.721,27.628l0.143,0.186
            C9.526,28.957,10.699,29.64,12,29.64c2.007,0,3.64-1.633,3.64-3.64V6c0-2.007-1.633-3.64-3.64-3.64
            c-1.301,0-2.474,0.683-3.137,1.826L8.747,4.365C8.493,4.869,8.36,5.431,8.36,6c0,0.64,0.168,1.269,0.487,1.82L8.224,8.18
            C7.842,7.521,7.64,6.766,7.64,6c0-0.547,0.103-1.088,0.3-1.593C5.901,4.694,4.36,6.42,4.36,8.5c0,0.876,0.283,1.722,0.817,2.446
            l0.246,0.333l-0.364,0.197C3.394,12.377,2.36,14.11,2.36,16c0,1.785,0.922,3.43,2.427,4.365C5.713,19.268,7.061,18.64,8.5,18.64
            v0.721c-1.206,0-2.336,0.517-3.125,1.424l-0.198,0.27C4.643,21.778,4.36,22.624,4.36,23.5c0,2.283,1.857,4.14,4.14,4.14
            L8.721,27.628z M27,25.36c-0.353,0-0.64,0.287-0.64,0.64s0.287,0.64,0.64,0.64s0.64-0.287,0.64-0.64S27.353,25.36,27,25.36z
            M29,17.36c-0.353,0-0.64,0.287-0.64,0.64s0.287,0.64,0.64,0.64s0.64-0.287,0.64-0.64S29.353,17.36,29,17.36z M29,13.36
            c-0.353,0-0.64,0.287-0.64,0.64s0.287,0.64,0.64,0.64s0.64-0.287,0.64-0.64S29.353,13.36,29,13.36z M27,5.36
            c-0.353,0-0.64,0.287-0.64,0.64S26.647,6.64,27,6.64S27.64,6.353,27.64,6S27.353,5.36,27,5.36z M12,28.36v-0.72
            c0.904,0,1.64-0.735,1.64-1.64h0.72C14.36,27.302,13.301,28.36,12,28.36z M9,26.36c-1.577,0-2.86-1.283-2.86-2.86h0.72
            c0,1.18,0.96,2.14,2.14,2.14C9,25.64,9,26.36,9,26.36z M12,24.36c-1.301,0-2.36-1.059-2.36-2.36s1.059-2.36,2.36-2.36v0.721
            c-0.904,0-1.64,0.735-1.64,1.64s0.736,1.64,1.64,1.64V24.36z M6.332,16.667C5.886,16.221,5.64,15.629,5.64,15
            c0-1.39,0.97-2.36,2.36-2.36c0.641,0,1.218,0.238,1.669,0.689l-0.51,0.509C8.847,13.525,8.446,13.36,8,13.36
            c-0.996,0-1.64,0.644-1.64,1.64c0,0.437,0.171,0.848,0.48,1.158L6.332,16.667z M12,12.86v-0.72c0.904,0,1.64-0.736,1.64-1.64
            S12.904,8.86,12,8.86V8.14c1.301,0,2.36,1.059,2.36,2.36S13.301,12.86,12,12.86z M14.36,6h-0.72c0-0.904-0.736-1.64-1.64-1.64
            S10.36,5.096,10.36,6H9.64c0-1.301,1.059-2.36,2.36-2.36S14.36,4.699,14.36,6z" />
          <rect
            style={{ fill: "none" }}
            width="32"
            height="32"
          />
        </svg>
      ),
    },

    {
      title: "Artificial Intelligence",
      description:
        "Designing intelligent applications that leverage ML and AI to automate decisions and insights.",
      iconBg: "bg-indigo-500/15",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="none"
        >
          <path
            fill="#000000"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3a2 2 0 0 0-1 3.732V8H8c-3.2 0-4 2.667-4 4v7c0 .667.4 2 2 2h1v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4h1c1.6 0 2-1.333 2-2v-7c0-3.2-2.667-4-4-4h-3V6.732A2 2 0 0 0 12 3zm3 18v-3h-2v3h2zm-4 0v-3H9v3h2zm10-3v-5c.667 0 2 .4 2 2v1c0 .667-.4 2-2 2zM3 13v5c-1.6 0-2-1.333-2-2v-1c0-1.6 1.333-2 2-2zm6-1a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2H9zm5 1a1 1 0 0 1 1-1h.001a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1z"
          />
        </svg>
      ),
    },
  ];

  const [tiltStyle, setTiltStyle] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.log("API error:", error);
    }
  };

  const addProject = async () => {
    try {
      await axios.post("http://localhost:5000/api/projects", newProject);
      fetchProjects();
      setNewProject({
        title: "",
        description: "",
        technologies: [],
        github: "",
        demo: "",
      });
    } catch (error) {
      console.log("Add error:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  useGSAP(() => {
    gsap.from(".hero-title", {
      scale: 0.8,
      y: 50,
      opacity: 0,
      duration: 1.5,
    });
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top 80%",
      onEnter: () =>
        gsap.from(".project-card", {
          y: 100,
          opacity: 0,
          stagger: 0.2,
        }),
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Harini Udyakumar
          </h1>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-blue-400 transition-all">
              Home
            </a>
            <a href="#about" className="hover:text-blue-400 transition-all">
              About
            </a>
            <a href="#projects" className="hover:text-blue-400 transition-all">
              Projects
            </a>
            <a href="#contact" className="hover:text-blue-400 transition-all">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero + 3D */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4"
      >
        {/* Left social bar */}
        <div className="hidden md:flex flex-col items-center gap-6 absolute left-6 top-1/2 -translate-y-1/2">
          <a
            href="https://github.com/H-A-R-I-N-I-U-D-A-Y-A-K-U-M-A-R"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-1 hover:text-blue-400 transition-transform duration-200"
          >
            {/* GitHub SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a10.7 10.7 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.8 5.5-5.4 5.8.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/harini-udayakumar-089624311/"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-1 hover:text-blue-400 transition-transform duration-200"
          >
            {/* LinkedIn SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
            >
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.29 8.33h4.42V23H.29zM8.46 8.33h4.24v2h.06c.59-1.1 2.02-2.26 4.16-2.26 4.45 0 5.27 2.93 5.27 6.73V23H17.7v-6.6c0-1.58-.03-3.62-2.21-3.62-2.21 0-2.55 1.73-2.55 3.51V23H8.46z" />
            </svg>
          </a>

          <a
            href="mailto:2023harini@gmail.com"
            className="hover:-translate-y-1 hover:text-blue-400 transition-transform duration-200"
          >
            {/* Mail SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
            >
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.2l8 5.3 8-5.3V6H4zm16 12V9.1l-8 5.3-8-5.3V18h16z" />
            </svg>
          </a>
        </div>

        {/* existing hero content */}
        <div className="text-center mb-16">
          <h1 className="hero-title text-5xl md:text-7xl font-black mb-6 leading-tight animate-slide-in-left">
            Software Developer
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Engineering Student
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-in-right">
            Passionate about building scalable, data-centric solutions
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <Portfolio3D />
        </div>
      </section>

      {/* About section */}
      <section id="about" className="py-24 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <ul>
              <li>
                <p className="text-gray-300 leading-relaxed mb-3">
                  I am a Computer Science Engineering student focused on building data-centric,
                  scalable web applications.
                </p>
              </li>
              <li>
                <p className="text-gray-300 leading-relaxed">
                  Interested in full‑stack development, AI, and modern tooling that
                  connects robust backends with clean user experiences.
                </p>
              </li>
            </ul>
          </div>

          {/* Feature cards row */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {aboutFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                iconBg={feature.iconBg}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rolling skills bar */}
      <div className="w-full border-t border-white/10 bg-black/40">
        <div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee py-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="mx-8 text-sm md:text-base font-medium text-gray-200"
              >
                {skill}
              </span>
            ))}
            {skills.map((skill) => (
              <span
                key={skill + "-dup"}
                className="mx-8 text-sm md:text-base font-medium text-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <section id="projects" className="py-24 px-4 bg-gradient-to-b from-rose-50/5 via-slate-900/60 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Featured Projects
          </h2>
          <p className="text-center text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-12">
            A selection of projects that highlight experience in data engineering, AI/ML,
            and building full‑stack systems that turn data into decisions.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-lg
           transform transition-transform duration-300 ease-out
           hover:-translate-y-3 hover:shadow-2xl"

              >
                {/* Top color band as placeholder for image */}
                <div className="h-28 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400" />

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {project.subtitle}
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-rose-200 mb-4">
                    {project.title}
                  </p>
                  <p className="text-sm text-gray-200 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-rose-100/10 text-[11px] font-medium text-rose-100 border border-rose-200/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Left: contact info cards */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-left">
              <h3 className="text-xl font-semibold mb-6 text-white">
                Contact
              </h3>

              {/* Social links */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
                  Social
                </p>
                <div className="flex items-center gap-4">
                  {/* GitHub */}
                  <a
                    href="https://github.com/H-A-R-I-N-I-U-D-A-Y-A-K-U-M-A-R"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-200 hover:bg-white/20 hover:text-blue-400 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a10.7 10.7 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.8 5.5-5.4 5.8.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/harini-udayakumar-089624311/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-200 hover:bg-white/20 hover:text-blue-400 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.29 8.33h4.42V23H.29zM8.46 8.33h4.24v2h.06c.59-1.1 2.02-2.26 4.16-2.26 4.45 0 5.27 2.93 5.27 6.73V23H17.7v-6.6c0-1.58-.03-3.62-2.21-3.62-2.21 0-2.55 1.73-2.55 3.51V23H8.46z" />
                    </svg>
                  </a>

                  {/* Mail shortcut */}
                  <a
                    href="mailto:2023harini@gmail.com"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-200 hover:bg-white/20 hover:text-rose-400 transition-colors"
                  >
                    ✉️
                  </a>
                </div>
              </div>
            </div>

            {/* Let's connect box */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 text-left">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Let&apos;s Connect!
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Open to new projects, collaborations, and conversations around software, AI, and data. Reach me through the contact form or any of the profiles above.
              </p>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-left">
            <h3 className="text-xl font-semibold mb-6 text-white">
              Get In Touch!
            </h3>
            <form className="space-y-5" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your e‑mail address"
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your message here…"
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 resize-none"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition-all duration-300"
              >
                <span>Send Message</span>
              </button>
            </form>

          </div>
        </div>
      </section>
    </div>
  );
}

export default App;


