// import { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import Editor from '@monaco-editor/react';
// import { useParams } from 'react-router';
// import axiosClient from "../utils/axiosClient"
// import SubmissionHistory from "../components/SubmissionHistory"
// import ChatAi from '../components/ChatAi';
// import Editorial from '../components/Editorial';

// const langMap = {
//         cpp: 'C++',
//         java: 'Java',
//         javascript: 'JavaScript'
// };


// const ProblemPage = () => {
//   const [problem, setProblem] = useState(null);
//   // const [selectedLanguage, setSelectedLanguage] = useState('javascript');
//   const [selectedLanguage, setSelectedLanguage] = useState('cpp');
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [runResult, setRunResult] = useState(null);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [activeLeftTab, setActiveLeftTab] = useState('description');
//   const [activeRightTab, setActiveRightTab] = useState('code');
//   const editorRef = useRef(null);
//   let {problemId}  = useParams();

  

//   const { handleSubmit } = useForm();

//  useEffect(() => {
//     const fetchProblem = async () => {
//       setLoading(true);
//       try {
        
//         // const response = await axiosClient.get(`/problem/problemById/${problemId}`);
//         // const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
//         // setProblem(response.data);
//         // setCode(initialCode);
//         // setLoading(false);

// const response = await axiosClient.get(`/problem/problemById/${problemId}`);
// const codeObj = response.data.startCode.find(  sc => sc.language === langMap[selectedLanguage] );
// const initialCode = codeObj ? codeObj.initialCode : "";

// setProblem(response.data);
// setCode(initialCode);
// setLoading(false);


        
//       } catch (error) {
//         console.error('Error fetching problem:', error);
//         setLoading(false);
//       }
//     };

//     fetchProblem();
//   }, [problemId]);

//   // Update code when language changes
//   useEffect(() => {
//     if (problem) {
//       const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
//       setCode(initialCode);
//     }
//   }, [selectedLanguage, problem]);

//   const handleEditorChange = (value) => {
//     setCode(value || '');
//   };

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor;
//   };

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//   };

//   const handleRun = async () => {
//     setLoading(true);
//     setRunResult(null);
    
//     try {
//       const response = await axiosClient.post(`/submission/run/${problemId}`, {
//         code,
//         language: selectedLanguage
//       });

//       setRunResult(response.data);
//       setLoading(false);
//       setActiveRightTab('testcase');
      
//     } catch (error) {
//       console.error('Error running code:', error);
//       setRunResult({
//         success: false,
//         error: 'Internal server error'
//       });
//       setLoading(false);
//       setActiveRightTab('testcase');
//     }
//   };

//   const handleSubmitCode = async () => {
//     setLoading(true);
//     setSubmitResult(null);
    
//     try {
//         const response = await axiosClient.post(`/submission/submit/${problemId}`, {
//         code:code,
//         language: selectedLanguage
//       });

//        setSubmitResult(response.data);
//        setLoading(false);
//        setActiveRightTab('result');
      
//     } catch (error) {
//       console.error('Error submitting code:', error);
//       setSubmitResult(null);
//       setLoading(false);
//       setActiveRightTab('result');
//     }
//   };

//   const getLanguageForMonaco = (lang) => {
//     switch (lang) {
//       case 'javascript': return 'javascript';
//       case 'java': return 'java';
//       case 'cpp': return 'cpp';
//       default: return 'javascript';
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'easy': return 'text-green-500';
//       case 'medium': return 'text-yellow-500';
//       case 'hard': return 'text-red-500';
//       default: return 'text-gray-500';
//     }
//   };

//   if (loading && !problem) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex bg-base-100">
//       {/* Left Panel */}
//       <div className="w-1/2 flex flex-col border-r border-base-300">
//         {/* Left Tabs */}
//         <div className="tabs tabs-bordered bg-base-200 px-4">
//           <button 
//             className={`tab ${activeLeftTab === 'description' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('description')}
//           >
//             Description
//           </button>
//           <button 
//             className={`tab ${activeLeftTab === 'editorial' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('editorial')}
//           >
//             Editorial
//           </button>
//           <button 
//             className={`tab ${activeLeftTab === 'solutions' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('solutions')}
//           >
//             Solutions
//           </button>
//           <button 
//             className={`tab ${activeLeftTab === 'submissions' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('submissions')}
//           >
//             Submissions
//           </button>

//           <button 
//             className={`tab ${activeLeftTab === 'chatAI' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('chatAI')}
//           >
//             ChatAI
//           </button>


//         </div>

//         {/* Left Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {problem && (
//             <>
//               {activeLeftTab === 'description' && (
//                 <div>
//                   <div className="flex items-center gap-4 mb-6">
//                     <h1 className="text-2xl font-bold">{problem.title}</h1>
//                     <div className={`badge badge-outline ${getDifficultyColor(problem.difficulty)}`}>
//                       {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
//                     </div>
//                     <div className="badge badge-primary">{problem.tags}</div>
//                   </div>

//                   <div className="prose max-w-none">
//                     <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                       {problem.description}
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <h3 className="text-lg font-semibold mb-4">Examples:</h3>
//                     <div className="space-y-4">
//                       {problem.visibleTestCases.map((example, index) => (
//                         <div key={index} className="bg-base-200 p-4 rounded-lg">
//                           <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
//                           <div className="space-y-2 text-sm font-mono">
//                             <div><strong>Input:</strong> {example.input}</div>
//                             <div><strong>Output:</strong> {example.output}</div>
//                             <div><strong>Explanation:</strong> {example.explanation}</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'editorial' && (
//                 <div className="prose max-w-none">
//                   <h2 className="text-xl font-bold mb-4">Editorial</h2>
//                   <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                     <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration}/>
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'solutions' && (
//                 <div>
//                   <h2 className="text-xl font-bold mb-4">Solutions</h2>
//                   <div className="space-y-6">
//                     {problem.referenceSolution?.map((solution, index) => (
//                       <div key={index} className="border border-base-300 rounded-lg">
//                         <div className="bg-base-200 px-4 py-2 rounded-t-lg">
//                           <h3 className="font-semibold">{problem?.title} - {solution?.language}</h3>
//                         </div>
//                         <div className="p-4">
//                           <pre className="bg-base-300 p-4 rounded text-sm overflow-x-auto">
//                             <code>{solution?.completeCode}</code>
//                           </pre>
//                         </div>
//                       </div>
//                     )) || <p className="text-gray-500">Solutions will be available after you solve the problem.</p>}
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'submissions' && (
//                 <div>
//                   <h2 className="text-xl font-bold mb-4">My Submissions</h2>
//                   <div className="text-gray-500">
//                     <SubmissionHistory problemId={problemId} />
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'chatAI' && (
//                 <div className="prose max-w-none">
//                   <h2 className="text-xl font-bold mb-4">CHAT with AI</h2>
//                   <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                     <ChatAi problem={problem}></ChatAi>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-1/2 flex flex-col">
//         {/* Right Tabs */}
//         <div className="tabs tabs-bordered bg-base-200 px-4">
//           <button 
//             className={`tab ${activeRightTab === 'code' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('code')}
//           >
//             Code
//           </button>
//           <button 
//             className={`tab ${activeRightTab === 'testcase' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('testcase')}
//           >
//             Testcase
//           </button>
//           <button 
//             className={`tab ${activeRightTab === 'result' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('result')}
//           >
//             Result
//           </button>
//         </div>

//         {/* Right Content */}
//         <div className="flex-1 flex flex-col">
//           {activeRightTab === 'code' && (
//             <div className="flex-1 flex flex-col">
//               {/* Language Selector */}
//               <div className="flex justify-between items-center p-4 border-b border-base-300">
//                 <div className="flex gap-2">
//                   {['javascript', 'java', 'cpp'].map((lang) => (
//                     <button
//                       key={lang}
//                       className={`btn btn-sm ${selectedLanguage === lang ? 'btn-primary' : 'btn-ghost'}`}
//                       onClick={() => handleLanguageChange(lang)}
//                     >
//                       {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Monaco Editor */}
//               <div className="flex-1">
//                 <Editor
//                   height="100%"
//                   language={getLanguageForMonaco(selectedLanguage)}
//                   value={code}
//                   onChange={handleEditorChange}
//                   onMount={handleEditorDidMount}
//                   theme="vs-dark"
//                   options={{
//                     fontSize: 14,
//                     minimap: { enabled: false },
//                     scrollBeyondLastLine: false,
//                     automaticLayout: true,
//                     tabSize: 2,
//                     insertSpaces: true,
//                     wordWrap: 'on',
//                     lineNumbers: 'on',
//                     glyphMargin: false,
//                     folding: true,
//                     lineDecorationsWidth: 10,
//                     lineNumbersMinChars: 3,
//                     renderLineHighlight: 'line',
//                     selectOnLineNumbers: true,
//                     roundedSelection: false,
//                     readOnly: false,
//                     cursorStyle: 'line',
//                     mouseWheelZoom: true,
//                   }}
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="p-4 border-t border-base-300 flex justify-between">
//                 <div className="flex gap-2">
//                   <button 
//                     className="btn btn-ghost btn-sm"
//                     onClick={() => setActiveRightTab('testcase')}
//                   >
//                     Console
//                   </button>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     className={`btn btn-outline btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleRun}
//                     disabled={loading}
//                   >
//                     Run
//                   </button>
//                   <button
//                     className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleSubmitCode}
//                     disabled={loading}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeRightTab === 'testcase' && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4">Test Results</h3>
//               {runResult ? (
//                 <div className={`alert ${runResult.success ? 'alert-success' : 'alert-error'} mb-4`}>
//                   <div>
//                     {runResult.success ? (
//                       <div>
//                         <h4 className="font-bold">✅ All test cases passed!</h4>
//                         <p className="text-sm mt-2">Runtime: {runResult.runtime+" sec"}</p>
//                         <p className="text-sm">Memory: {runResult.memory+" KB"}</p>
                        
//                         <div className="mt-4 space-y-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div key={i} className="bg-base-100 p-3 rounded text-xs">
//                               <div className="font-mono">
//                                 <div><strong>Input:</strong> {tc.stdin}</div>
//                                 <div><strong>Expected:</strong> {tc.expected_output}</div>
//                                 <div><strong>Output:</strong> {tc.stdout}</div>
//                                 <div className={'text-green-600'}>
//                                   {'✓ Passed'}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <h4 className="font-bold">❌ Error</h4>
//                         <div className="mt-4 space-y-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div key={i} className="bg-base-100 p-3 rounded text-xs">
//                               <div className="font-mono">
//                                 <div><strong>Input:</strong> {tc.stdin}</div>
//                                 <div><strong>Expected:</strong> {tc.expected_output}</div>
//                                 <div><strong>Output:</strong> {tc.stdout}</div>
//                                 <div className={tc.status_id==3 ? 'text-green-600' : 'text-red-600'}>
//                                   {tc.status_id==3 ? '✓ Passed' : '✗ Failed'}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-gray-500">
//                   Click "Run" to test your code with the example test cases.
//                 </div>
//               )}
//             </div>
//           )}

//           {activeRightTab === 'result' && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4">Submission Result</h3>
//               {submitResult ? (
//                 <div className={`alert ${submitResult.accepted ? 'alert-success' : 'alert-error'}`}>
//                   <div>
//                     {submitResult.accepted ? (
//                       <div>
//                         <h4 className="font-bold text-lg">🎉 Accepted</h4>
//                         <div className="mt-4 space-y-2">
//                           <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
//                           <p>Runtime: {submitResult.runtime + " sec"}</p>
//                           <p>Memory: {submitResult.memory + "KB"} </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <h4 className="font-bold text-lg">❌ {submitResult.error}</h4>
//                         <div className="mt-4 space-y-2">
//                           <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-gray-500">
//                   Click "Submit" to submit your solution for evaluation.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemPage;















import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient"
import SubmissionHistory from "../components/SubmissionHistory"
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';

const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript'
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const editorRef = useRef(null);
  let { problemId } = useParams();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const codeObj = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]);
        const initialCode = codeObj ? codeObj.initialCode : "";
        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => setCode(value || '');
  const handleEditorDidMount = (editor) => { editorRef.current = editor; };
  const handleLanguageChange = (language) => setSelectedLanguage(language);

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, { code, language: selectedLanguage });
      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({ success: false, error: 'Internal server error' });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, { code, language: selectedLanguage });
      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'pp-diff-easy';
      case 'medium': return 'pp-diff-medium';
      case 'hard': return 'pp-diff-hard';
      default: return 'pp-diff-default';
    }
  };

  if (loading && !problem) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        minHeight: '100vh', background: '#0d0f14'
      }}>
        <div style={{
          width: 40, height: 40, border: '3px solid rgba(99,102,241,0.2)',
          borderTop: '3px solid #6366f1', borderRadius: '50%',
          animation: 'pp-spin 0.8s linear infinite'
        }} />
        <style>{`@keyframes pp-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

        .pp-root {
          height: 100vh;
          display: flex;
          background: #0d0f14;
          color: #e2e8f0;
          font-family: 'Syne', sans-serif;
          overflow: hidden;
        }

        /* ── PANELS ── */
        .pp-left {
          width: 50%;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(99,102,241,0.15);
        }

        .pp-right {
          width: 50%;
          display: flex;
          flex-direction: column;
        }

        /* ── TABS ── */
        .pp-tabs {
          display: flex;
          align-items: center;
          background: #111318;
          border-bottom: 1px solid rgba(99,102,241,0.15);
          padding: 0 12px;
          gap: 2px;
          flex-shrink: 0;
        }

        .pp-tab {
          padding: 10px 16px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #64748b;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
          white-space: nowrap;
          font-family: 'Syne', sans-serif;
        }

        .pp-tab:hover {
          color: #94a3b8;
        }

        .pp-tab.active {
          color: #818cf8;
          border-bottom-color: #6366f1;
        }

        /* ── SCROLLABLE CONTENT ── */
        .pp-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .pp-scroll::-webkit-scrollbar { width: 4px; }
        .pp-scroll::-webkit-scrollbar-track { background: transparent; }
        .pp-scroll::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }

        /* ── DESCRIPTION ── */
        .pp-title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .pp-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #f1f5f9;
        }

        .pp-badge {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 5px;
          text-transform: capitalize;
        }

        .pp-diff-easy  { background: rgba(34,197,94,0.1);  color: #4ade80; border: 1px solid rgba(34,197,94,0.25); }
        .pp-diff-medium{ background: rgba(251,191,36,0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }
        .pp-diff-hard  { background: rgba(239,68,68,0.1);  color: #f87171; border: 1px solid rgba(239,68,68,0.25); }
        .pp-diff-default{ background: rgba(148,163,184,0.1); color: #94a3b8; border: 1px solid rgba(148,163,184,0.2); }

        .pp-tag-badge {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 5px;
          background: rgba(6,182,212,0.08);
          color: #67e8f9;
          border: 1px solid rgba(6,182,212,0.2);
        }

        .pp-description {
          font-size: 0.88rem;
          line-height: 1.75;
          color: #94a3b8;
          white-space: pre-wrap;
        }

        .pp-examples-title {
          font-size: 1rem;
          font-weight: 700;
          color: #e2e8f0;
          margin: 28px 0 14px;
        }

        .pp-example-card {
          background: rgba(22,25,34,0.8);
          border: 1px solid rgba(99,102,241,0.12);
          border-radius: 10px;
          padding: 14px 16px;
          margin-bottom: 10px;
        }

        .pp-example-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #818cf8;
          margin-bottom: 8px;
        }

        .pp-example-row {
          font-size: 0.82rem;
          color: #94a3b8;
          margin-bottom: 4px;
          line-height: 1.5;
        }

        .pp-example-row strong {
          color: #cbd5e1;
        }

        /* ── SOLUTIONS ── */
        .pp-solution-card {
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .pp-solution-header {
          background: rgba(22,25,34,0.9);
          padding: 10px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
          border-bottom: 1px solid rgba(99,102,241,0.1);
        }

        .pp-code-block {
          background: #0d0f14;
          padding: 16px;
          font-size: 0.8rem;
          overflow-x: auto;
          color: #94a3b8;
          line-height: 1.6;
        }

        .pp-section-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #e2e8f0;
          margin-bottom: 16px;
        }

        /* ── LANGUAGE BAR ── */
        .pp-lang-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid rgba(99,102,241,0.12);
          background: #111318;
          flex-shrink: 0;
        }

        .pp-lang-btns {
          display: flex;
          gap: 6px;
        }

        .pp-lang-btn {
          padding: 5px 14px;
          border-radius: 7px;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          border: 1px solid rgba(99,102,241,0.2);
          background: transparent;
          color: #64748b;
          transition: all 0.15s;
        }

        .pp-lang-btn:hover {
          color: #94a3b8;
          border-color: rgba(99,102,241,0.35);
        }

        .pp-lang-btn.active {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
          color: #818cf8;
        }

        /* ── ACTION BAR ── */
        .pp-action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-top: 1px solid rgba(99,102,241,0.12);
          background: #111318;
          flex-shrink: 0;
        }

        .pp-btn {
          padding: 7px 18px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
          border: none;
        }

        .pp-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pp-btn-ghost {
          background: transparent;
          color: #64748b;
          border: 1px solid rgba(99,102,241,0.15);
        }

        .pp-btn-ghost:hover:not(:disabled) {
          color: #94a3b8;
          border-color: rgba(99,102,241,0.3);
        }

        .pp-btn-outline {
          background: transparent;
          color: #818cf8;
          border: 1px solid rgba(99,102,241,0.35);
        }

        .pp-btn-outline:hover:not(:disabled) {
          background: rgba(99,102,241,0.1);
        }

        .pp-btn-primary {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          border: 1px solid rgba(99,102,241,0.5);
          box-shadow: 0 2px 12px rgba(99,102,241,0.25);
        }

        .pp-btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #818cf8, #6366f1);
          box-shadow: 0 4px 18px rgba(99,102,241,0.35);
        }

        /* ── RESULTS ── */
        .pp-result-box {
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 12px;
        }

        .pp-result-success {
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.2);
        }

        .pp-result-error {
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.2);
        }

        .pp-result-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .pp-result-meta {
          font-size: 0.82rem;
          color: #94a3b8;
          margin-bottom: 4px;
        }

        .pp-tc-card {
          background: rgba(13,15,20,0.8);
          border: 1px solid rgba(99,102,241,0.1);
          border-radius: 8px;
          padding: 12px;
          margin-top: 8px;
          font-size: 0.78rem;
          line-height: 1.6;
          color: #94a3b8;
        }

        .pp-tc-card strong {
          color: #cbd5e1;
        }

        .pp-passed { color: #4ade80; font-weight: 600; }
        .pp-failed { color: #f87171; font-weight: 600; }

        .pp-empty {
          color: #475569;
          font-size: 0.85rem;
          margin-top: 12px;
        }
      `}</style>

      <div className="pp-root">
        {/* ── LEFT PANEL ── */}
        <div className="pp-left">
          <div className="pp-tabs">
            {['description', 'editorial', 'solutions', 'submissions', 'chatAI'].map(tab => (
              <button
                key={tab}
                className={`pp-tab ${activeLeftTab === tab ? 'active' : ''}`}
                onClick={() => setActiveLeftTab(tab)}
              >
                {tab === 'chatAI' ? 'Chat AI' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="pp-scroll">
            {problem && (
              <>
                {activeLeftTab === 'description' && (
                  <div>
                    <div className="pp-title-row">
                      <h1 className="pp-title">{problem.title}</h1>
                      <span className={`pp-badge ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </span>
                      <span className="pp-tag-badge">{problem.tags}</span>
                    </div>

                    <div className="pp-description">{problem.description}</div>

                    <div className="pp-examples-title">Examples</div>
                    <div>
                      {problem.visibleTestCases.map((example, index) => (
                        <div key={index} className="pp-example-card">
                          <div className="pp-example-label">Example {index + 1}</div>
                          <div className="pp-example-row"><strong>Input:</strong> {example.input}</div>
                          <div className="pp-example-row"><strong>Output:</strong> {example.output}</div>
                          <div className="pp-example-row"><strong>Explanation:</strong> {example.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeLeftTab === 'editorial' && (
                  <div>
                    <div className="pp-section-title">Editorial</div>
                    <div style={{ fontSize: '0.88rem', lineHeight: 1.75 }}>
                      <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration} />
                    </div>
                  </div>
                )}

                {activeLeftTab === 'solutions' && (
                  <div>
                    <div className="pp-section-title">Solutions</div>
                    {problem.referenceSolution?.map((solution, index) => (
                      <div key={index} className="pp-solution-card">
                        <div className="pp-solution-header">
                          {problem?.title} — {solution?.language}
                        </div>
                        <div className="pp-code-block">
                          <pre style={{ margin: 0 }}><code>{solution?.completeCode}</code></pre>
                        </div>
                      </div>
                    )) || <p className="pp-empty">Solutions will be available after you solve the problem.</p>}
                  </div>
                )}

                {activeLeftTab === 'submissions' && (
                  <div>
                    <div className="pp-section-title">My Submissions</div>
                    <SubmissionHistory problemId={problemId} />
                  </div>
                )}

                {activeLeftTab === 'chatAI' && (
                  <div>
                    <div className="pp-section-title">Chat with AI</div>
                    <div style={{ fontSize: '0.88rem', lineHeight: 1.75 }}>
                      <ChatAi problem={problem} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="pp-right">
          <div className="pp-tabs">
            {['code', 'testcase', 'result'].map(tab => (
              <button
                key={tab}
                className={`pp-tab ${activeRightTab === tab ? 'active' : ''}`}
                onClick={() => setActiveRightTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {activeRightTab === 'code' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="pp-lang-bar">
                  <div className="pp-lang-btns">
                    {['javascript', 'java', 'cpp'].map(lang => (
                      <button
                        key={lang}
                        className={`pp-lang-btn ${selectedLanguage === lang ? 'active' : ''}`}
                        onClick={() => handleLanguageChange(lang)}
                      >
                        {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <Editor
                    height="100%"
                    language={getLanguageForMonaco(selectedLanguage)}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      insertSpaces: true,
                      wordWrap: 'on',
                      lineNumbers: 'on',
                      glyphMargin: false,
                      folding: true,
                      lineDecorationsWidth: 10,
                      lineNumbersMinChars: 3,
                      renderLineHighlight: 'line',
                      selectOnLineNumbers: true,
                      roundedSelection: false,
                      readOnly: false,
                      cursorStyle: 'line',
                      mouseWheelZoom: true,
                    }}
                  />
                </div>

                <div className="pp-action-bar">
                  <div>
                    <button className="pp-btn pp-btn-ghost" onClick={() => setActiveRightTab('testcase')}>
                      Console
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="pp-btn pp-btn-outline" onClick={handleRun} disabled={loading}>
                      {loading ? 'Running...' : 'Run'}
                    </button>
                    <button className="pp-btn pp-btn-primary" onClick={handleSubmitCode} disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeRightTab === 'testcase' && (
              <div className="pp-scroll">
                <div className="pp-section-title">Test Results</div>
                {runResult ? (
                  <div className={`pp-result-box ${runResult.success ? 'pp-result-success' : 'pp-result-error'}`}>
                    {runResult.success ? (
                      <div>
                        <div className="pp-result-title" style={{ color: '#4ade80' }}>✅ All test cases passed!</div>
                        <div className="pp-result-meta">Runtime: {runResult.runtime} sec</div>
                        <div className="pp-result-meta">Memory: {runResult.memory} KB</div>
                        <div style={{ marginTop: 12 }}>
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="pp-tc-card">
                              <div><strong>Input:</strong> {tc.stdin}</div>
                              <div><strong>Expected:</strong> {tc.expected_output}</div>
                              <div><strong>Output:</strong> {tc.stdout}</div>
                              <div className="pp-passed">✓ Passed</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="pp-result-title" style={{ color: '#f87171' }}>❌ Error</div>
                        <div style={{ marginTop: 12 }}>
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="pp-tc-card">
                              <div><strong>Input:</strong> {tc.stdin}</div>
                              <div><strong>Expected:</strong> {tc.expected_output}</div>
                              <div><strong>Output:</strong> {tc.stdout}</div>
                              <div className={tc.status_id == 3 ? 'pp-passed' : 'pp-failed'}>
                                {tc.status_id == 3 ? '✓ Passed' : '✗ Failed'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="pp-empty">Click "Run" to test your code with the example test cases.</p>
                )}
              </div>
            )}

            {activeRightTab === 'result' && (
              <div className="pp-scroll">
                <div className="pp-section-title">Submission Result</div>
                {submitResult ? (
                  <div className={`pp-result-box ${submitResult.accepted ? 'pp-result-success' : 'pp-result-error'}`}>
                    {submitResult.accepted ? (
                      <div>
                        <div className="pp-result-title" style={{ color: '#4ade80' }}>🎉 Accepted</div>
                        <div className="pp-result-meta">Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</div>
                        <div className="pp-result-meta">Runtime: {submitResult.runtime} sec</div>
                        <div className="pp-result-meta">Memory: {submitResult.memory} KB</div>
                      </div>
                    ) : (
                      <div>
                        <div className="pp-result-title" style={{ color: '#f87171' }}>❌ {submitResult.error}</div>
                        <div className="pp-result-meta">Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="pp-empty">Click "Submit" to submit your solution for evaluation.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemPage;