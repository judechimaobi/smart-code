'use client';

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import { highlight, languages } from "prismjs";
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import { Menu, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import Editor from "react-simple-code-editor";


export default function PlayGround() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [code, setCode] = useState(`function helloWorld() {
  console.log('Hello, world!');
}`);
  const [aiResult, setAiResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
      const data = await res.json();
      if (res.ok) {
        setAiResult(data.result);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch audit result');
        setAiResult('');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setAiResult('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen bg-gray-900 text-[#EEEEEE] font-space relative">
      <div
        className="absolute inset-0 h-full"
        style={{
          backgroundImage: `url('../images/axiom-pattern.png')`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: 0.3,
          zIndex: 1, 
        }}
      />
      <div className="relative z-10 h-full backdrop-blur-xs/20">
      {/* <div className="absolute inset-0 backdrop-blur-md"></div> */}
      
      
        {/* NavBar */}
        <nav className="hidden md:flex items-center justify-between px-4 py-10 z-50 w-full fixed">
          <div className="text-xl font-bold">
            De<span className="text-green-400">Sage</span> Playground
          </div>
          <button
            className="md:hidden block text-white focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
        </nav>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row h-[calc(100vh-3rem)] pt-24">
          
          {/* Sidebar */}
          <div
            className={` p-6 transition-all duration-300 md:block ${
              sidebarOpen ? 'block w-full md:w-1/5' : 'hidden'
            }
            `}
          >
            <h2 className="text-lg font-semibold mb-4">Projects</h2>
            <p className='px-4 py-4 bg-gray-800 font-ibm rounded-2xl shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ease-in-out'>
            <span className='text-green-400 bold'>DeSage</span> is an AI-powered Smart Contract Code Auditor that helps developers identify vulnerabilities and optimize smart contracts. Using AI models like GPT-3.5 or GPT-4, it analyzes contract code for potential issues such as security flaws, gas inefficiencies, and compliance risks. Users can paste their code, receive detailed AI-generated analysis, and address flagged issues before deployment. It’s an essential tool for developers ensuring secure and efficient smart contracts across blockchain platforms like Ethereum and Solana.
            </p>
            {/* <ul className="space-y-2">
              <li className="px-4 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center gap-2 cursor-pointer">
                <CheckCircle size={18} className="text-green-500" />
                Item 1
              </li>
            </ul> */}
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col md:flex-row">
            {/* Input Column */}
            <div className="w-full md:w-2/4 lg:w-2/5 p-6">
              <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(code) => highlight(code, languages.javascript, "javascript")}
                padding={16}
                className="w-full h-[70vh] bg-gray-800 text-[#EEEEEE] font-mono text-sm rounded-2xl border-2 border-gray-600 shadow-lg focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/50"
                style={{
                  whiteSpace: "pre-wrap",
                  outline: "none",
                  overflow: "auto",
                }}
                placeholder="Paste your code here..."
              />
              <button
                className="mt-4 w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-green-950 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-2"
                onClick={handleAudit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Start Audit'
                )}
              </button>
            </div>

            {/* AI Response Column */}
            <div className="w-full md:w-2/4 lg:w-3/5 p-6">
              <h2 className="text-lg font-semibold mb-2">AI Analysis</h2>
              <div className="bg-gray-800 p-4 rounded-2xl h-full shadow-xl overflow-auto whitespace-pre-wrap">
                {loading ? (
                  <p className="text-gray-400 flex items-center gap-2">
                    <Loader size={18} className="animate-spin" />
                    Running AI Audit...
                  </p>
                ) : error ? (
                  <p className="text-red-600 flex items-center gap-2">
                    <AlertCircle size={18} />
                    {error}
                  </p>
                ) : aiResult ? (
                  <p>{aiResult}</p>
                ) : (
                  <p className="text-gray-500 font-mono">Your AI-generated code analysis will appear here...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Responsive Mobile Layout Adjustment  */}
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
