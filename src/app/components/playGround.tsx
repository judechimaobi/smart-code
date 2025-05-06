'use client';

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';

export default function PlayGround() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [code, setCode] = useState(`function helloWorld() {
  console.log('Hello, world!');
}`);
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, aiResult]);

  const handleAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      console.log(res);

      const data = await res.json();
      setAiResult(data.result);
    } catch (error) {
      setAiResult('❌ Error analyzing code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-[#EEEEEE]">
      {/* NavBar */}
      <nav className="hidden md:flex items-center justify-between px-4 py-10 bg-gray-900 shadow-lg shadow-gray z-50 w-full fixed">
        <div className="text-xl font-bold">Code <span className='text-red-600'>RED</span></div>
        <button
          className="md:hidden block text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-3rem)] pt-32">
        {/* Sidebar */}
        <div
          className={`bg-gray-900 p-6 transition-all duration-300 md:block ${
            sidebarOpen ? 'block w-full md:w-1/5' : 'hidden'
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          <ul className="space-y-2">
            <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 1</li>
            <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 2</li>
            <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 3</li>
            <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 4</li>
            <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 5</li>
          </ul>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Input Column */}
          <div className="w-full md:w-2/4 lg:w-2/5 bg-gray-900 p-6">
            <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
            <textarea
              className="w-full h-[70vh] bg-gray-800 text-[#EEEEEE] px-6 py-8 rounded-2xl resize-none shadow-xl shadow-black/45"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
            />
            <button
              className="mt-4 w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold"
              onClick={handleAudit}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Audit Code'}
            </button>
          </div>

          {/* AI Response Column */}
          <div className="w-full md:w-2/4 lg:w-3/5 bg-gray-900 p-6">
            <h2 className="text-lg font-semibold mb-2">AI Analysis</h2>
            <div className="bg-gray-800 p-4 rounded-2xl h-full shadow-xl shadow-black/45 overflow-auto whitespace-pre-wrap">
              {loading ? (
                <p className="text-gray-400">⏳ Running GPT-4 Audit...</p>
              ) : aiResult ? (
                <p>{aiResult}</p>
              ) : (
                <p className="text-gray-500">Your AI-generated code analysis will appear here.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Layout Adjustment */}
      <style jsx>{`
        @media (max-width: 767px) {
          .flex-col.md\:flex-row > div {
            flex-direction: column-reverse;
          }
          .md\:w-2\/4 {
            width: 100% !important;
          }
          .lg\:w-2\/5, .lg\:w-3\/5 {
            width: 100% !important;
          }
          textarea {
            height: 30vh;
          }
        }
      `}</style>
    </div>
  );
}





// 'use client';

// import React, { useState, useEffect } from 'react';
// import Prism from 'prismjs';
// import 'prismjs/themes/prism-tomorrow.css';
// import 'prismjs/components/prism-javascript';

// export default function PlayGround() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [code, setCode] = useState(`function helloWorld() {
//   console.log('Hello, world!');
// }`);

//   useEffect(() => {
//     Prism.highlightAll();
//   }, [code]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-[#EEEEEE]">
//       {/* NavBar */}
//       <nav className="hidden md:flex items-center justify-between px-4 py-10 bg-gray-900 shadow-lg shadow-gray z-50 w-full fixed">
//         <div className="text-xl font-bold">Code <span className='text-red-600'>RED</span></div>
//         <button
//           className="md:hidden block text-white"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           ☰
//         </button>
//       </nav>

//       {/* Main Layout */}
//       <div className="flex flex-col md:flex-row h-[calc(100vh-3rem)] pt-32">
//         {/* Sidebar */}
//         <div
//           className={`bg-gray-900 p-6 transition-all duration-300 md:block ${
//             sidebarOpen ? 'block w-full md:w-1/5' : 'hidden'
//           }`}
//         >
//           <h2 className="text-lg font-semibold mb-4">Projects</h2>
//           <ul className="space-y-2">
//             <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 1</li>
//             <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 2</li>
//             <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 3</li>
//             <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 4</li>
//             <li className='px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700'>Item 5</li>
//           </ul>
//         </div>

//         {/* Content Section */}
//         <div className="flex flex-1 flex-col md:flex-row">
//           {/* Input Column */}
//           <div className="w-full md:w-2/4 lg:w-2/5 bg-gray-900 p-6">
//             <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
//             <textarea
//               className="w-full h-full bg-gray-800 text-[#EEEEEE] px-6 py-8 rounded-2xl resize-none shadow-xl shadow-black/45"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               placeholder="Paste your code here..."
//             />
//           </div>

//           {/* AI Response Column */}
//           <div className="w-full md:w-2/4 lg:w-3/5 bg-gray-900 p-6">
//             <h2 className="text-lg font-semibold mb-2">AI Analysis</h2>
//             <div className="bg-gray-800 p-4 rounded-2xl h-full shadow-xl shadow-black/45 overflow-auto">
//               <pre className={"rounded-2xl language-javascript"} tabIndex={0}>
//                 <code className="language-javascript">{code || <p>Your AI-generated code analysis will appear here.</p>}</code>
//               </pre>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Responsive Mobile Layout Adjustment */}
//       <style jsx>{`
//         @media (max-width: 767px) {
//           .flex-col.md\:flex-row > div {
//             flex-direction: column-reverse;
//           }
//           .md\:w-2\/4 {
//             width: 100% !important;
//           }
//           .lg\:w-2\/5, .lg\:w-3\/5 {
//             width: 100% !important;
//           }
//           textarea {
//             height: 30vh;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }