// import { useRef } from "react";

// export default function Footer({ data = {} }) {
//   const formRef = useRef();

//   const sendEmail = async (e) => {
//     e.preventDefault();

//     const formData = {
//       name: formRef.current.user_name.value,
//       email: formRef.current.user_email.value,
//       subject: formRef.current.subject.value,
//       message: formRef.current.message.value,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Message Sent Successfully!");
//         formRef.current.reset();
//       } else {
//         alert("Failed to send message!");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server Error!");
//     }
//   };

//   return (
//     <footer
//       id="contact"
//       className="py-24 px-6 bg-slate-950 border-t border-slate-900/50 scroll-mt-20"
//     >
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-center text-4xl md:text-5xl font-black text-emerald-500 mb-5">
//           Let's Connect
//         </h2>

//         <p className="text-slate-400 mb-10 text-center">
//           A concise overview of my educational journey from school to SSC,
//           building a strong foundation in computer science and problem-solving.
//         </p>

//         <div className="grid lg:grid-cols-2 gap-16 items-start">
//           {/* LEFT SIDE */}
//           <div className="space-y-8">
//             <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase italic">
//               Let's Build <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
//                 Something Great.
//               </span>
//             </h2>

//             <p className="text-slate-400 text-sm leading-relaxed max-w-md">
//               I’m always open to discussing new projects, creative ideas or
//               opportunities to be part of your visions.
//             </p>

//             <a
//               href={`mailto:${data?.email || ""}`}
//               className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold inline-block"
//             >
//               Email Me
//             </a>
//           </div>

//           {/* RIGHT SIDE - FORM */}
//           <form
//             ref={formRef}
//             onSubmit={sendEmail}
//             className="space-y-5 bg-slate-900/30 border border-slate-800 p-8 rounded-3xl"
//           >
//             <h3 className="text-2xl font-bold text-white mb-2">Contact Me</h3>

//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 name="user_name"
//                 type="text"
//                 placeholder="Your Name"
//                 className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
//                 required
//               />

//               <input
//                 name="user_email"
//                 type="email"
//                 placeholder="Your Email"
//                 className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
//                 required
//               />
//             </div>

//             <input
//               name="subject"
//               type="text"
//               placeholder="Subject"
//               className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
//               required
//             />

//             <textarea
//               name="message"
//               rows="6"
//               placeholder="Your Message..."
//               className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold"
//             >
//               Send Message 🚀
//             </button>
//           </form>
//         </div>

//         {/* BOTTOM */}
//         <div className="mt-24 pt-10 border-t border-slate-900 text-center text-slate-600 text-xs">
//           © {new Date().getFullYear()} {data?.name || "Developer"}
//         </div>
//       </div>
//     </footer>
//   );
// }
