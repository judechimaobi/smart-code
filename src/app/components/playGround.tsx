'use client';

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import { highlight, languages } from "prismjs";
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import { Menu, Loader, AlertCircle, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-900 text-[#EEEEEE] font-space relative">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-80 z-0"
        style={{
          backgroundImage: `url('../images/bg-4.jpeg')`,
          backgroundSize: 'contain, auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Blurred Overlay + Content */}
      <div className="relative z-10 min-h-screen bg-black/60"
        
      >
        {/* Navbar */}
        <nav
          className="flex items-center justify-between px-6 py-6 fixed top-0 left-0 w-full z-50 border-b-[.1] border-b-white/30"
          style={{
            backgroundImage: `url('../images/bg-4.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-0" />

          <div className="text-xl font-bold z-10">
            De<span className="text-green-400">Sage</span> Playground
          </div>

          <button
            className="md:hidden text-white z-10"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
        </nav>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row pt-24 min-h-screen">
          {/* Sidebar */}
          <div
            className={`w-full md:w-1/5 p-6 transition-all duration-300 ${
              sidebarOpen ? 'block' : 'hidden md:block'
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Projects</h2>
            <p className="px-4 py-4 bg-green-950/80 font-ibm rounded-2xl shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <span className="text-green-400 font-bold">DeSage</span> is an AI-powered Smart Contract Code Auditor that analyzes code for vulnerabilities, gas inefficiencies, and compliance risks using GPT models. Paste your code, receive insights, and deploy with confidence.
            </p>
            <ul className="space-y-2 mt-4">
              <li className="px-4 py-4 rounded-xl bg-green-950 hover:bg-green-900 flex items-center gap-2 cursor-pointer">
                <CheckCircle size={18} className="text-green-500" />
                {/* <Github size={18} className="text-green-500" /> */}
                View repo on Github
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:flex-row gap-6 p-6">
            {/* Editor */}
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(code) =>
                  highlight(code, languages.javascript, 'javascript')
                }
                padding={16}
                className="w-full h-[60vh] bg-green-950/40 text-[#EEEEEE] font-mono text-sm rounded-2xl border-2 border-green-600 shadow-lg focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/50"
                style={{
                  whiteSpace: 'pre-wrap',
                  outline: 'none',
                  overflow: 'auto',
                }}
                placeholder="Paste your code here..."
              />
              <button
                className="mt-4 w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-green-950 rounded-xl font-semibold flex items-center justify-center gap-2"
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

            {/* AI Analysis */}
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold mb-2">AI Analysis</h2>
              <div className="bg-black/30 p-4 rounded-2xl h-[60vh] border-2 border-white/30  overflow-auto whitespace-pre-wrap">
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
                  <p className="text-gray-500 font-mono">
                    Your AI-generated code analysis will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
