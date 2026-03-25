// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router'; // Fixed import
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all' 
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]); // Clear solved problems on logout
//   };

//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//     const statusMatch = filters.status === 'all' || 
//                       solvedProblems.some(sp => sp._id === problem._id);
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <div className="min-h-screen bg-base-200">
//       {/* Navigation Bar */}
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost text-xl">AlgoJudge</NavLink>
//         </div>
//         <div className="flex-none gap-4">
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} className="btn btn-ghost">
//               {user?.firstName}
//             </div>
//             <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//               <li><button onClick={handleLogout}>Logout</button></li>
//               {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="container mx-auto p-4">
//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           {/* New Status Filter */}
//           <select 
//             className="select select-bordered"
//             value={filters.status}
//             onChange={(e) => setFilters({...filters, status: e.target.value})}
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved Problems</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.difficulty}
//             onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.tag}
//             onChange={(e) => setFilters({...filters, tag: e.target.value})}
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problems List */}
//         <div className="grid gap-4">
//           {filteredProblems.map(problem => (
//             <div key={problem._id} className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center justify-between">
//                   <h2 className="card-title">
//                     <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
//                       {problem.title}
//                     </NavLink>
//                   </h2>
//                   {solvedProblems.some(sp => sp._id === problem._id) && (
//                     <div className="badge badge-success gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Solved
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex gap-2">
//                   <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
//                     {problem.difficulty}
//                   </div>
//                   <div className="badge badge-info">
//                     {problem.tags}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case 'easy': return 'badge-success';
//     case 'medium': return 'badge-warning';
//     case 'hard': return 'badge-error';
//     default: return 'badge-neutral';
//   }
// };

// export default Homepage;





// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// /* ── Inject styles once ── */
// if (typeof document !== "undefined" && !document.getElementById("aj-home-styles")) {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;800&display=swap";
//   document.head.appendChild(link);

//   const style = document.createElement("style");
//   style.id = "aj-home-styles";
//   style.textContent = `
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     .aj-page {
//       min-height: 100vh;
//       background-color: #0a0a0f;
//       background-image:
//         radial-gradient(ellipse 70% 40% at 50% -5%, rgba(99,102,241,0.11) 0%, transparent 60%),
//         radial-gradient(ellipse 50% 30% at 95% 100%, rgba(16,185,129,0.06) 0%, transparent 60%),
//         linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px),
//         linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px);
//       background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
//       font-family: 'Syne', sans-serif;
//     }

//     /* ── Navbar ── */
//     .aj-nav {
//       background: rgba(10,10,20,0.92);
//       border-bottom: 1px solid rgba(99,102,241,0.18);
//       padding: 0 2rem;
//       height: 60px;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       position: sticky;
//       top: 0;
//       z-index: 100;
//       backdrop-filter: blur(12px);
//     }
//     .aj-nav::after {
//       content: '';
//       position: absolute;
//       bottom: 0; left: 0; right: 0;
//       height: 1px;
//       background: linear-gradient(90deg, transparent, #6366f1, #10b981, transparent);
//     }
//     .aj-nav-left {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       text-decoration: none;
//     }
//     .aj-nav-icon {
//       width: 30px; height: 30px;
//       background: linear-gradient(135deg, #6366f1, #10b981);
//       border-radius: 4px;
//       display: flex; align-items: center; justify-content: center;
//       flex-shrink: 0;
//     }
//     .aj-nav-icon svg {
//       width: 15px; height: 15px;
//       fill: none; stroke: white; stroke-width: 2;
//     }
//     .aj-nav-title {
//       font-family: 'Syne', sans-serif;
//       font-weight: 800;
//       font-size: 1.1rem;
//       color: #f1f5f9;
//       letter-spacing: -0.02em;
//     }
//     .aj-nav-right {
//       position: relative;
//     }
//     .aj-user-btn {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       background: rgba(99,102,241,0.08);
//       border: 1px solid rgba(99,102,241,0.2);
//       border-radius: 2px;
//       padding: 0.4rem 0.875rem;
//       color: #e2e8f0;
//       font-family: 'Syne', sans-serif;
//       font-size: 0.875rem;
//       font-weight: 600;
//       cursor: pointer;
//       transition: background 0.15s, border-color 0.15s;
//     }
//     .aj-user-btn:hover {
//       background: rgba(99,102,241,0.14);
//       border-color: rgba(99,102,241,0.35);
//     }
//     .aj-user-btn svg {
//       width: 14px; height: 14px;
//       transition: transform 0.2s;
//     }
//     .aj-dropdown {
//       display: none;
//       position: absolute;
//       right: 0; top: calc(100% + 8px);
//       background: rgba(15,15,25,0.98);
//       border: 1px solid rgba(99,102,241,0.2);
//       border-radius: 2px;
//       min-width: 160px;
//       box-shadow: 0 8px 32px rgba(0,0,0,0.5);
//       overflow: hidden;
//       z-index: 200;
//     }
//     .aj-nav-right:hover .aj-dropdown,
//     .aj-nav-right:focus-within .aj-dropdown {
//       display: block;
//     }
//     .aj-dropdown-item {
//       display: block;
//       width: 100%;
//       padding: 0.6rem 1rem;
//       background: none;
//       border: none;
//       color: #94a3b8;
//       font-family: 'Syne', sans-serif;
//       font-size: 0.825rem;
//       font-weight: 500;
//       text-align: left;
//       cursor: pointer;
//       text-decoration: none;
//       transition: background 0.12s, color 0.12s;
//     }
//     .aj-dropdown-item:hover {
//       background: rgba(99,102,241,0.1);
//       color: #e2e8f0;
//     }
//     .aj-dropdown-divider {
//       height: 1px;
//       background: rgba(99,102,241,0.1);
//     }

//     /* ── Container ── */
//     .aj-container {
//       max-width: 860px;
//       margin: 0 auto;
//       padding: 2.5rem 1.5rem;
//     }

//     /* ── Stats bar ── */
//     .aj-stats {
//       display: flex;
//       gap: 1rem;
//       margin-bottom: 1.75rem;
//       flex-wrap: wrap;
//     }
//     .aj-stat {
//       background: rgba(15,15,25,0.8);
//       border: 1px solid rgba(99,102,241,0.15);
//       border-radius: 2px;
//       padding: 0.6rem 1.1rem;
//       display: flex;
//       align-items: center;
//       gap: 8px;
//     }
//     .aj-stat-num {
//       font-family: 'Syne', sans-serif;
//       font-weight: 800;
//       font-size: 1.1rem;
//       color: #818cf8;
//     }
//     .aj-stat-label {
//       font-family: 'Syne', sans-serif;
//       font-size: 0.75rem;
//       color: #64748b;
//       font-weight: 500;
//     }

//     /* ── Filters ── */
//     .aj-filters {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 0.75rem;
//       margin-bottom: 1.75rem;
//     }
//     .aj-select {
//       background: rgba(15,15,25,0.9);
//       border: 1px solid rgba(99,102,241,0.2);
//       border-radius: 2px;
//       color: #94a3b8;
//       font-family: 'Syne', sans-serif;
//       font-size: 0.825rem;
//       font-weight: 500;
//       padding: 0.5rem 0.875rem;
//       outline: none;
//       cursor: pointer;
//       transition: border-color 0.15s, color 0.15s;
//       appearance: none;
//       -webkit-appearance: none;
//       padding-right: 2rem;
//       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
//       background-repeat: no-repeat;
//       background-position: right 0.6rem center;
//     }
//     .aj-select:focus, .aj-select:hover {
//       border-color: rgba(99,102,241,0.4);
//       color: #e2e8f0;
//     }
//     .aj-select option {
//       background: #0f0f19;
//       color: #e2e8f0;
//     }

//     /* ── Problem list ── */
//     .aj-problem-list {
//       display: flex;
//       flex-direction: column;
//       gap: 0.5rem;
//     }

//     .aj-problem-row {
//       background: rgba(15,15,25,0.8);
//       border: 1px solid rgba(99,102,241,0.12);
//       border-radius: 2px;
//       padding: 0.875rem 1.25rem;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       gap: 1rem;
//       transition: border-color 0.15s, background 0.15s;
//     }
//     .aj-problem-row:hover {
//       border-color: rgba(99,102,241,0.3);
//       background: rgba(99,102,241,0.04);
//     }

//     .aj-problem-left {
//       display: flex;
//       align-items: center;
//       gap: 0.875rem;
//       min-width: 0;
//     }

//     .aj-problem-title {
//       font-family: 'Syne', sans-serif;
//       font-size: 0.925rem;
//       font-weight: 600;
//       color: #cbd5e1;
//       text-decoration: none;
//       transition: color 0.15s;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }
//     .aj-problem-title:hover { color: #818cf8; }

//     .aj-problem-right {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       flex-shrink: 0;
//     }

//     /* ── Badges ── */
//     .aj-badge {
//       font-family: 'Syne', sans-serif;
//       font-size: 0.7rem;
//       font-weight: 600;
//       padding: 2px 8px;
//       border-radius: 2px;
//       border: 1px solid;
//       white-space: nowrap;
//     }
//     .aj-badge-easy {
//       color: #34d399;
//       border-color: rgba(52,211,153,0.3);
//       background: rgba(52,211,153,0.07);
//     }
//     .aj-badge-medium {
//       color: #fbbf24;
//       border-color: rgba(251,191,36,0.3);
//       background: rgba(251,191,36,0.07);
//     }
//     .aj-badge-hard {
//       color: #f87171;
//       border-color: rgba(248,113,113,0.3);
//       background: rgba(248,113,113,0.07);
//     }
//     .aj-badge-tag {
//       color: #818cf8;
//       border-color: rgba(129,140,248,0.25);
//       background: rgba(99,102,241,0.07);
//     }
//     .aj-badge-solved {
//       color: #34d399;
//       border-color: rgba(52,211,153,0.3);
//       background: rgba(52,211,153,0.07);
//       display: flex;
//       align-items: center;
//       gap: 4px;
//     }

//     /* ── Empty state ── */
//     .aj-empty {
//       text-align: center;
//       padding: 4rem 2rem;
//       color: #475569;
//       font-family: 'Syne', sans-serif;
//       font-size: 0.875rem;
//     }
//     .aj-empty-icon { font-size: 2rem; margin-bottom: 0.75rem; }
//   `;
//   document.head.appendChild(style);
// }

// /* ── Difficulty badge helper ── */
// const getDifficultyClass = (difficulty) => {
//   switch (difficulty?.toLowerCase()) {
//     case 'easy':   return 'aj-badge aj-badge-easy';
//     case 'medium': return 'aj-badge aj-badge-medium';
//     case 'hard':   return 'aj-badge aj-badge-hard';
//     default:       return 'aj-badge aj-badge-tag';
//   }
// };

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all'
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]);
//   };

//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//     const statusMatch = filters.status === 'all' ||
//                         solvedProblems.some(sp => sp._id === problem._id);
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <div className="aj-page">
//       {/* Navbar */}
//       <nav className="aj-nav">
//         <NavLink to="/" className="aj-nav-left">
//           <div className="aj-nav-icon">
//             <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M8 3L4 12l4 9M16 3l4 9-4 9M5 9h14M5 15h14"/>
//             </svg>
//           </div>
//           <span className="aj-nav-title">AlgoJudge</span>
//         </NavLink>

//         <div className="aj-nav-right">
//           <button className="aj-user-btn">
//             {user?.firstName}
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>
//           <div className="aj-dropdown">
//             <button className="aj-dropdown-item" onClick={handleLogout}>Logout</button>
//             {user?.role === 'admin' && (
//               <>
//                 <div className="aj-dropdown-divider" />
//                 <NavLink to="/admin" className="aj-dropdown-item">Admin</NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Main */}
//       <div className="aj-container">

//         {/* Stats */}
//         <div className="aj-stats">
//           <div className="aj-stat">
//             <span className="aj-stat-num">{problems.length}</span>
//             <span className="aj-stat-label">Total Problems</span>
//           </div>
//           <div className="aj-stat">
//             <span className="aj-stat-num" style={{ color: '#34d399' }}>{solvedProblems.length}</span>
//             <span className="aj-stat-label">Solved</span>
//           </div>
//           <div className="aj-stat">
//             <span className="aj-stat-num" style={{ color: '#94a3b8' }}>{problems.length - solvedProblems.length}</span>
//             <span className="aj-stat-label">Remaining</span>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="aj-filters">
//           <select
//             className="aj-select"
//             value={filters.status}
//             onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved Problems</option>
//           </select>

//           <select
//             className="aj-select"
//             value={filters.difficulty}
//             onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select
//             className="aj-select"
//             value={filters.tag}
//             onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problem List */}
//         <div className="aj-problem-list">
//           {filteredProblems.length === 0 ? (
//             <div className="aj-empty">
//               <div className="aj-empty-icon">🔍</div>
//               No problems match your filters.
//             </div>
//           ) : (
//             filteredProblems.map(problem => (
//               <div key={problem._id} className="aj-problem-row">
//                 <div className="aj-problem-left">
//                   <NavLink to={`/problem/${problem._id}`} className="aj-problem-title">
//                     {problem.title}
//                   </NavLink>
//                   <span className="aj-badge aj-badge-tag">{problem.tags}</span>
//                 </div>

//                 <div className="aj-problem-right">
//                   <span className={getDifficultyClass(problem.difficulty)}>
//                     {problem.difficulty}
//                   </span>
//                   {solvedProblems.some(sp => sp._id === problem._id) && (
//                     <span className="aj-badge aj-badge-solved">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Solved
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case 'easy': return 'badge-success';
//     case 'medium': return 'badge-warning';
//     case 'hard': return 'badge-error';
//     default: return 'badge-neutral';
//   }
// };

// export default Homepage;

























// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all'
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]);
//   };

//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//     const statusMatch = filters.status === 'all' ||
//       solvedProblems.some(sp => sp._id === problem._id);
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;700;800&display=swap');

//         .aj-root {
//           min-height: 100vh;
//           background: #0d0f14;
//           color: #e2e8f0;
//           font-family: 'Syne', sans-serif;
//           position: relative;
//           overflow-x: hidden;
//         }

//         /* Subtle grid background */
//         .aj-root::before {
//           content: '';
//           position: fixed;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
//           background-size: 40px 40px;
//           pointer-events: none;
//           z-index: 0;
//         }

//         /* Glow blob top-right */
//         .aj-root::after {
//           content: '';
//           position: fixed;
//           top: -120px;
//           right: -120px;
//           width: 480px;
//           height: 480px;
//           background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
//           pointer-events: none;
//           z-index: 0;
//         }

//         /* ── NAVBAR ── */
//         .aj-nav {
//           position: sticky;
//           top: 0;
//           z-index: 50;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 2rem;
//           height: 60px;
//           background: rgba(13, 15, 20, 0.85);
//           backdrop-filter: blur(12px);
//           border-bottom: 1px solid rgba(99,102,241,0.15);
//         }

//         .aj-logo {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           text-decoration: none;
//           color: #e2e8f0;
//         }

//         .aj-logo-icon {
//           width: 32px;
//           height: 32px;
//           background: linear-gradient(135deg, #6366f1, #06b6d4);
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .aj-logo-icon svg {
//           width: 18px;
//           height: 18px;
//           fill: white;
//         }

//         .aj-logo-text {
//           font-size: 1.15rem;
//           font-weight: 800;
//           letter-spacing: -0.02em;
//           color: #f1f5f9;
//         }

//         .aj-nav-right {
//           position: relative;
//         }

//         .aj-user-btn {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           background: rgba(99,102,241,0.08);
//           border: 1px solid rgba(99,102,241,0.2);
//           border-radius: 8px;
//           padding: 6px 14px;
//           cursor: pointer;
//           color: #c7d2fe;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.8rem;
//           transition: background 0.2s, border-color 0.2s;
//         }

//         .aj-user-btn:hover {
//           background: rgba(99,102,241,0.15);
//           border-color: rgba(99,102,241,0.4);
//         }

//         .aj-user-avatar {
//           width: 26px;
//           height: 26px;
//           background: linear-gradient(135deg, #6366f1, #06b6d4);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 0.65rem;
//           font-weight: 700;
//           color: white;
//           font-family: 'Syne', sans-serif;
//         }

//         .aj-dropdown {
//           position: absolute;
//           right: 0;
//           top: calc(100% + 8px);
//           background: #161922;
//           border: 1px solid rgba(99,102,241,0.2);
//           border-radius: 10px;
//           overflow: hidden;
//           min-width: 160px;
//           box-shadow: 0 16px 40px rgba(0,0,0,0.5);
//           display: none;
//         }

//         .aj-nav-right:focus-within .aj-dropdown,
//         .aj-nav-right:hover .aj-dropdown {
//           display: block;
//         }

//         .aj-dropdown a,
//         .aj-dropdown button {
//           display: block;
//           width: 100%;
//           text-align: left;
//           padding: 10px 16px;
//           background: none;
//           border: none;
//           color: #94a3b8;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.78rem;
//           cursor: pointer;
//           text-decoration: none;
//           transition: background 0.15s, color 0.15s;
//         }

//         .aj-dropdown a:hover,
//         .aj-dropdown button:hover {
//           background: rgba(99,102,241,0.1);
//           color: #e2e8f0;
//         }

//         /* ── MAIN ── */
//         .aj-main {
//           position: relative;
//           z-index: 1;
//           max-width: 900px;
//           margin: 0 auto;
//           padding: 2.5rem 1.5rem;
//         }

//         /* ── FILTERS ── */
//         .aj-filters {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 10px;
//           margin-bottom: 2rem;
//         }

//         .aj-select {
//           appearance: none;
//           background: rgba(22, 25, 34, 0.9);
//           border: 1px solid rgba(99,102,241,0.2);
//           border-radius: 8px;
//           padding: 8px 36px 8px 14px;
//           color: #94a3b8;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.78rem;
//           cursor: pointer;
//           outline: none;
//           transition: border-color 0.2s, color 0.2s;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236366f1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 12px center;
//         }

//         .aj-select:hover,
//         .aj-select:focus {
//           border-color: rgba(99,102,241,0.5);
//           color: #e2e8f0;
//         }

//         /* ── PROBLEM CARDS ── */
//         .aj-problem-list {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }

//         .aj-card {
//           background: rgba(22, 25, 34, 0.7);
//           border: 1px solid rgba(99,102,241,0.1);
//           border-radius: 10px;
//           padding: 16px 20px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 12px;
//           transition: border-color 0.2s, background 0.2s, transform 0.15s;
//           position: relative;
//           overflow: hidden;
//         }

//         .aj-card::before {
//           content: '';
//           position: absolute;
//           left: 0;
//           top: 0;
//           bottom: 0;
//           width: 3px;
//           background: transparent;
//           transition: background 0.2s;
//         }

//         .aj-card:hover {
//           border-color: rgba(99,102,241,0.3);
//           background: rgba(99,102,241,0.05);
//           transform: translateX(3px);
//         }

//         .aj-card:hover::before {
//           background: linear-gradient(180deg, #6366f1, #06b6d4);
//         }

//         .aj-card-left {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           min-width: 0;
//         }

//         .aj-card-title {
//           font-size: 0.95rem;
//           font-weight: 600;
//           color: #e2e8f0;
//           text-decoration: none;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           transition: color 0.15s;
//         }

//         .aj-card-title:hover {
//           color: #818cf8;
//         }

//         .aj-card-tags {
//           display: flex;
//           gap: 6px;
//           flex-wrap: wrap;
//         }

//         .aj-badge {
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.68rem;
//           font-weight: 500;
//           padding: 3px 9px;
//           border-radius: 5px;
//           letter-spacing: 0.03em;
//           text-transform: uppercase;
//         }

//         .aj-badge-easy {
//           background: rgba(34,197,94,0.1);
//           color: #4ade80;
//           border: 1px solid rgba(34,197,94,0.2);
//         }

//         .aj-badge-medium {
//           background: rgba(251,191,36,0.1);
//           color: #fbbf24;
//           border: 1px solid rgba(251,191,36,0.2);
//         }

//         .aj-badge-hard {
//           background: rgba(239,68,68,0.1);
//           color: #f87171;
//           border: 1px solid rgba(239,68,68,0.2);
//         }

//         .aj-badge-neutral {
//           background: rgba(148,163,184,0.1);
//           color: #94a3b8;
//           border: 1px solid rgba(148,163,184,0.2);
//         }

//         .aj-badge-tag {
//           background: rgba(6,182,212,0.08);
//           color: #67e8f9;
//           border: 1px solid rgba(6,182,212,0.15);
//         }

//         .aj-badge-solved {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           background: rgba(34,197,94,0.08);
//           color: #4ade80;
//           border: 1px solid rgba(34,197,94,0.2);
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.68rem;
//           padding: 3px 10px;
//           border-radius: 5px;
//           white-space: nowrap;
//           flex-shrink: 0;
//         }

//         .aj-empty {
//           text-align: center;
//           padding: 4rem 2rem;
//           color: #475569;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.85rem;
//         }
//       `}</style>

//       <div className="aj-root">
//         {/* Navigation */}
//         <nav className="aj-nav">
//           <NavLink to="/" className="aj-logo">
//             <div className="aj-logo-icon">
//               <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
//                 <rect x="2" y="5" width="5" height="8" rx="1"/>
//                 <rect x="11" y="5" width="5" height="8" rx="1"/>
//                 <rect x="7" y="2" width="4" height="14" rx="1"/>
//               </svg>
//             </div>
//             <span className="aj-logo-text">AlgoJudge</span>
//           </NavLink>

//           <div className="aj-nav-right" tabIndex={0}>
//             <button className="aj-user-btn">
//               <div className="aj-user-avatar">
//                 {user?.firstName?.[0]?.toUpperCase()}
//               </div>
//               {user?.firstName}
//             </button>
//             <div className="aj-dropdown">
//               <button onClick={handleLogout}>Logout</button>
//               {user?.role === 'admin' && (
//                 <NavLink to="/admin">Admin Panel</NavLink>
//               )}
//             </div>
//           </div>
//         </nav>

//         {/* Main Content */}
//         <div className="aj-main">
//           {/* Filters */}
//           <div className="aj-filters">
//             <select
//               className="aj-select"
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//             >
//               <option value="all">All Problems</option>
//               <option value="solved">Solved Problems</option>
//             </select>

//             <select
//               className="aj-select"
//               value={filters.difficulty}
//               onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
//             >
//               <option value="all">All Difficulties</option>
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>

//             <select
//               className="aj-select"
//               value={filters.tag}
//               onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
//             >
//               <option value="all">All Tags</option>
//               <option value="array">Array</option>
//               <option value="linkedList">Linked List</option>
//               <option value="graph">Graph</option>
//               <option value="dp">DP</option>
//             </select>
//           </div>

//           {/* Problems List */}
//           <div className="aj-problem-list">
//             {filteredProblems.length === 0 ? (
//               <div className="aj-empty">// no problems found</div>
//             ) : (
//               filteredProblems.map(problem => (
//                 <div key={problem._id} className="aj-card">
//                   <div className="aj-card-left">
//                     <NavLink
//                       to={`/problem/${problem._id}`}
//                       className="aj-card-title"
//                     >
//                       {problem.title}
//                     </NavLink>
//                     <div className="aj-card-tags">
//                       <span className={`aj-badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
//                         {problem.difficulty}
//                       </span>
//                       <span className="aj-badge aj-badge-tag">
//                         {problem.tags}
//                       </span>
//                     </div>
//                   </div>

//                   {solvedProblems.some(sp => sp._id === problem._id) && (
//                     <span className="aj-badge-solved">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Solved
//                     </span>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const getDifficultyBadgeClass = (difficulty) => {
//   switch (difficulty?.toLowerCase()) {
//     case 'easy': return 'aj-badge-easy';
//     case 'medium': return 'aj-badge-medium';
//     case 'hard': return 'aj-badge-hard';
//     default: return 'aj-badge-neutral';
//   }
// };

// export default Homepage;






















import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' ||
      solvedProblems.some(sp => sp._id === problem._id);
    return difficultyMatch && tagMatch && statusMatch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

        .aj-root {
          min-height: 100vh;
          background: #0d0f14;
          color: #e2e8f0;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Subtle grid background */
        .aj-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        /* Glow blob top-right */
        .aj-root::after {
          content: '';
          position: fixed;
          top: -120px;
          right: -120px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAVBAR ── */
        .aj-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 60px;
          background: rgba(13, 15, 20, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(99,102,241,0.15);
        }

        .aj-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #e2e8f0;
        }

        .aj-logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .aj-logo-icon svg {
          width: 18px;
          height: 18px;
          fill: white;
        }

        .aj-logo-text {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #f1f5f9;
        }

        .aj-nav-right {
          position: relative;
        }

        .aj-user-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 8px;
          padding: 6px 14px;
          cursor: pointer;
          color: #c7d2fe;
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          transition: background 0.2s, border-color 0.2s;
        }

        .aj-user-btn:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
        }

        .aj-user-avatar {
          width: 26px;
          height: 26px;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          color: white;
          font-family: 'Syne', sans-serif;
        }

        .aj-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background: #161922;
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 10px;
          overflow: hidden;
          min-width: 160px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
          display: none;
        }

        .aj-nav-right:focus-within .aj-dropdown,
        .aj-nav-right:hover .aj-dropdown {
          display: block;
        }

        .aj-dropdown a,
        .aj-dropdown button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 10px 16px;
          background: none;
          border: none;
          color: #94a3b8;
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }

        .aj-dropdown a:hover,
        .aj-dropdown button:hover {
          background: rgba(99,102,241,0.1);
          color: #e2e8f0;
        }

        /* ── MAIN ── */
        .aj-main {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
        }

        /* ── FILTERS ── */
        .aj-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 2rem;
        }

        .aj-select {
          appearance: none;
          background: rgba(22, 25, 34, 0.9);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 8px;
          padding: 8px 36px 8px 14px;
          color: #94a3b8;
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s, color 0.2s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236366f1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }

        .aj-select:hover,
        .aj-select:focus {
          border-color: rgba(99,102,241,0.5);
          color: #e2e8f0;
        }

        /* ── PROBLEM CARDS ── */
        .aj-problem-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .aj-card {
          background: rgba(22, 25, 34, 0.7);
          border: 1px solid rgba(99,102,241,0.1);
          border-radius: 10px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }

        .aj-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: transparent;
          transition: background 0.2s;
        }

        .aj-card:hover {
          border-color: rgba(99,102,241,0.3);
          background: rgba(99,102,241,0.05);
          transform: translateX(3px);
        }

        .aj-card:hover::before {
          background: linear-gradient(180deg, #6366f1, #06b6d4);
        }

        .aj-card-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .aj-card-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #e2e8f0;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.15s;
        }

        .aj-card-title:hover {
          color: #818cf8;
        }

        .aj-card-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .aj-badge {
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 5px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .aj-badge-easy {
          background: rgba(34,197,94,0.1);
          color: #4ade80;
          border: 1px solid rgba(34,197,94,0.2);
        }

        .aj-badge-medium {
          background: rgba(251,191,36,0.1);
          color: #fbbf24;
          border: 1px solid rgba(251,191,36,0.2);
        }

        .aj-badge-hard {
          background: rgba(239,68,68,0.1);
          color: #f87171;
          border: 1px solid rgba(239,68,68,0.2);
        }

        .aj-badge-neutral {
          background: rgba(148,163,184,0.1);
          color: #94a3b8;
          border: 1px solid rgba(148,163,184,0.2);
        }

        .aj-badge-tag {
          background: rgba(6,182,212,0.08);
          color: #67e8f9;
          border: 1px solid rgba(6,182,212,0.15);
        }

        .aj-badge-solved {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(34,197,94,0.08);
          color: #4ade80;
          border: 1px solid rgba(34,197,94,0.2);
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          padding: 3px 10px;
          border-radius: 5px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .aj-empty {
          text-align: center;
          padding: 4rem 2rem;
          color: #475569;
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="aj-root">
        {/* Navigation */}
        <nav className="aj-nav">
          <NavLink to="/" className="aj-logo">
            <div className="aj-logo-icon">
              <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="5" width="5" height="8" rx="1"/>
                <rect x="11" y="5" width="5" height="8" rx="1"/>
                <rect x="7" y="2" width="4" height="14" rx="1"/>
              </svg>
            </div>
            <span className="aj-logo-text">AlgoJudge</span>
          </NavLink>

          <div className="aj-nav-right" tabIndex={0}>
            <button className="aj-user-btn">
              <div className="aj-user-avatar">
                {user?.firstName?.[0]?.toUpperCase()}
              </div>
              {user?.firstName}
            </button>
            <div className="aj-dropdown">
              <button onClick={handleLogout}>Logout</button>
              {user?.role === 'admin' && (
                <NavLink to="/admin">Admin Panel</NavLink>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="aj-main">
          {/* Filters */}
          <div className="aj-filters">
            <select
              className="aj-select"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Problems</option>
              <option value="solved">Solved Problems</option>
            </select>

            <select
              className="aj-select"
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              className="aj-select"
              value={filters.tag}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            >
              <option value="all">All Tags</option>
              <option value="array">Array</option>
              <option value="linkedList">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">DP</option>
            </select>
          </div>

          {/* Problems List */}
          <div className="aj-problem-list">
            {filteredProblems.length === 0 ? (
              <div className="aj-empty">No problems found</div>
            ) : (
              filteredProblems.map(problem => (
                <div key={problem._id} className="aj-card">
                  <div className="aj-card-left">
                    <NavLink
                      to={`/problem/${problem._id}`}
                      className="aj-card-title"
                    >
                      {problem.title}
                    </NavLink>
                    <div className="aj-card-tags">
                      <span className={`aj-badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="aj-badge aj-badge-tag">
                        {problem.tags}
                      </span>
                    </div>
                  </div>

                  {solvedProblems.some(sp => sp._id === problem._id) && (
                    <span className="aj-badge-solved">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Solved
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy': return 'aj-badge-easy';
    case 'medium': return 'aj-badge-medium';
    case 'hard': return 'aj-badge-hard';
    default: return 'aj-badge-neutral';
  }
};

export default Homepage;