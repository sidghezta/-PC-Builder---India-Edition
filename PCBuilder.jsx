import React, { useState, useEffect, useMemo } from 'react';
import { 
  Cpu, 
  CircuitBoard, 
  MemoryStick, 
  HardDrive, 
  Monitor, 
  Zap, 
  Box, 
  ShoppingCart, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  ExternalLink,
  IndianRupee,
  Cpu as GpuIcon,
  MousePointerClick,
  GripVertical,
  Fan,
  Moon,
  Sun
} from 'lucide-react';

// --- DATA ---
const PARTS_DB = {
  cpus: [
    { id: 'c1', name: 'Intel Core i3-13100F', price: 9500, socket: 'LGA1700', type: 'Intel', image: 'blue', tdp: 60 },
    { id: 'c2', name: 'Intel Core i5-13400F', price: 19200, socket: 'LGA1700', type: 'Intel', image: 'blue', tdp: 65 },
    { id: 'c3', name: 'AMD Ryzen 5 7600X', price: 21500, socket: 'AM5', type: 'AMD', image: 'orange', tdp: 105 },
    { id: 'c4', name: 'Intel Core i5-13600K', price: 28500, socket: 'LGA1700', type: 'Intel', image: 'blue', tdp: 125 },
    { id: 'c5', name: 'AMD Ryzen 7 7800X3D', price: 36999, socket: 'AM5', type: 'AMD', image: 'orange', tdp: 120 },
    { id: 'c6', name: 'Intel Core i7-14700K', price: 38900, socket: 'LGA1700', type: 'Intel', image: 'blue', tdp: 125 },
    { id: 'c7', name: 'Intel Core i9-14900K', price: 54500, socket: 'LGA1700', type: 'Intel', image: 'blue', tdp: 125 },
  ],
  motherboards: [
    { id: 'm1', name: 'MSI PRO H610M-E DDR4', price: 6800, socket: 'LGA1700', memory: 'DDR4', format: 'mATX', image: 'slate-800' },
    { id: 'm2', name: 'Gigabyte B760M DS3H AX DDR4', price: 13500, socket: 'LGA1700', memory: 'DDR4', format: 'mATX', image: 'slate-700' },
    { id: 'm3', name: 'MSI MAG B760 Tomahawk WiFi', price: 18500, socket: 'LGA1700', memory: 'DDR5', format: 'ATX', image: 'slate-900' },
    { id: 'm4', name: 'ASUS Prime B650M-A WiFi II', price: 15200, socket: 'AM5', memory: 'DDR5', format: 'mATX', image: 'slate-700' },
    { id: 'm5', name: 'MSI MAG B650 Tomahawk WiFi', price: 21000, socket: 'AM5', memory: 'DDR5', format: 'ATX', image: 'slate-900' },
    { id: 'm6', name: 'ASUS ROG Strix Z790-F Gaming', price: 34500, socket: 'LGA1700', memory: 'DDR5', format: 'ATX', image: 'slate-900' },
  ],
  rams: [
    { id: 'r1', name: 'Corsair Vengeance LPX 8GB', price: 1800, type: 'DDR4', speed: '3200MHz', size: 8, color: 'black' },
    { id: 'r2', name: 'XPG ADATA GAMMIX D30 16GB', price: 3200, type: 'DDR4', speed: '3200MHz', size: 16, color: 'red' },
    { id: 'r8', name: 'Kingston FURY Beast 16GB (1x16)', price: 3400, type: 'DDR4', speed: '3200MHz', size: 16, color: 'black' },
    { id: 'r7', name: 'TeamGroup T-Force Delta RGB 16GB (2x8)', price: 5200, type: 'DDR4', speed: '3600MHz', size: 16, color: 'white' },
    { id: 'r3', name: 'Corsair Vengeance RGB RS 32GB', price: 7500, type: 'DDR4', speed: '3600MHz', size: 32, color: 'black' },
    { id: 'r4', name: 'Crucial 16GB (2x8) Kit', price: 4500, type: 'DDR5', speed: '4800MHz', size: 16, color: 'green' },
    { id: 'r10', name: 'Adata XPG Lancer 16GB (1x16)', price: 5100, type: 'DDR5', speed: '5200MHz', size: 16, color: 'black' },
    { id: 'r5', name: 'G.Skill Ripjaws S5 32GB', price: 9200, type: 'DDR5', speed: '6000MHz', size: 32, color: 'black' },
    { id: 'r6', name: 'G.Skill Trident Z5 RGB 32GB', price: 11500, type: 'DDR5', speed: '6400MHz', size: 32, color: 'silver' },
    { id: 'r9', name: 'Corsair Dominator Platinum RGB 32GB', price: 14500, type: 'DDR5', speed: '6200MHz', size: 32, color: 'white' },
  ],
  gpus: [
    { id: 'g0', name: 'No Discrete GPU (iGPU)', price: 0, vram: '0GB', tdp: 0, length: 0 },
    { id: 'g1', name: 'ASUS Dual Radeon RX 6600', price: 19500, vram: '8GB', tdp: 132, length: 243, color: 'slate-800' },
    { id: 'g2', name: 'Zotac Gaming RTX 3060 Twin Edge', price: 24500, vram: '12GB', tdp: 170, length: 224, color: 'slate-700' },
    { id: 'g3', name: 'Gigabyte RTX 4060 Eagle OC', price: 29500, vram: '8GB', tdp: 115, length: 272, color: 'slate-600' },
    { id: 'g4', name: 'Sapphire Pulse RX 7700 XT', price: 41000, vram: '12GB', tdp: 245, length: 280, color: 'red-900' },
    { id: 'g5', name: 'Zotac RTX 4070 Super Twin Edge', price: 58500, vram: '12GB', tdp: 220, length: 234, color: 'slate-800' },
    { id: 'g6', name: 'Gigabyte RTX 4080 Super Gaming', price: 105000, vram: '16GB', tdp: 320, length: 342, color: 'slate-900' },
  ],
  storages: [
    { id: 's1', name: 'Crucial P3 500GB NVMe', price: 3200, type: 'NVMe', speed: '3500MB/s' },
    { id: 's2', name: 'WD Blue SN580 1TB NVMe', price: 5800, type: 'NVMe', speed: '4150MB/s' },
    { id: 's3', name: 'Samsung 980 Pro 1TB NVMe', price: 8900, type: 'NVMe', speed: '7000MB/s' },
    { id: 's4', name: 'WD Black SN850X 2TB NVMe', price: 14500, type: 'NVMe', speed: '7300MB/s' },
  ],
  psus: [
    { id: 'p1', name: 'Ant Esports VS500L', price: 1800, watts: 500, rating: 'Non-Rated' },
    { id: 'p2', name: 'Deepcool PK650D', price: 4400, watts: 650, rating: '80+ Bronze' },
    { id: 'p3', name: 'Corsair CX650', price: 5200, watts: 650, rating: '80+ Bronze' },
    { id: 'p4', name: 'MSI MAG A750GL', price: 7800, watts: 750, rating: '80+ Gold' },
    { id: 'p5', name: 'Corsair RM850e', price: 10500, watts: 850, rating: '80+ Gold' },
    { id: 'p6', name: 'ASUS ROG Thor 1000W', price: 28000, watts: 1000, rating: '80+ Platinum' },
  ],
  cases: [
    { id: 'case1', name: 'Ant Esports ICE-112', price: 3200, form: 'ATX', color: 'black' },
    { id: 'case2', name: 'Deepcool CC560 V2', price: 4500, form: 'ATX', color: 'black' },
    { id: 'case3', name: 'NZXT H5 Flow', price: 7600, form: 'ATX', color: 'white' },
    { id: 'case4', name: 'Lian Li O11 Dynamic', price: 12500, form: 'ATX', color: 'white' },
    { id: 'case5', name: 'Corsair 4000D Airflow', price: 6800, form: 'ATX', color: 'black' },
  ]
};

const STEPS = [
  { key: 'cpu', label: 'Processor', icon: Cpu },
  { key: 'motherboard', label: 'Motherboard', icon: CircuitBoard },
  { key: 'ram', label: 'Memory', icon: MemoryStick },
  { key: 'gpu', label: 'Graphics Card', icon: GpuIcon },
  { key: 'storage', label: 'Storage', icon: HardDrive },
  { key: 'psu', label: 'Power Supply', icon: Zap },
  { key: 'case', label: 'Cabinet', icon: Box },
];

export default function IndianPCBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [build, setBuild] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    storage: null,
    psu: null,
    case: null,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTDP, setTotalTDP] = useState(0);
  const [draggedType, setDraggedType] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Calculate totals whenever build changes
  useEffect(() => {
    let price = 0;
    let tdp = 0;
    Object.values(build).forEach(part => {
      if (part) {
        price += part.price;
        if (part.tdp) tdp += part.tdp;
        if (!part.tdp && part.id) tdp += 10; 
      }
    });
    setTotalPrice(price);
    setTotalTDP(tdp);
  }, [build]);

  // Compatibility Filtering
  const getCompatibleParts = (stepKey) => {
    const allParts = PARTS_DB[stepKey + 's']; 
    if (!allParts) return [];

    return allParts.filter(part => {
      if (stepKey === 'motherboard' && build.cpu) return part.socket === build.cpu.socket;
      if (stepKey === 'ram' && build.motherboard) return part.type === build.motherboard.memory;
      return true;
    });
  };

  const handleSelect = (part) => {
    setBuild(prev => {
      const stepKey = STEPS.find(s => PARTS_DB[s.key + 's']?.some(p => p.id === part.id))?.key;
      if (!stepKey) return prev; 

      const newBuild = { ...prev, [stepKey]: part };
      
      if (stepKey === 'cpu') {
        if (newBuild.motherboard && newBuild.motherboard.socket !== part.socket) {
          newBuild.motherboard = null;
          newBuild.ram = null;
        }
      }
      if (stepKey === 'motherboard') {
        if (newBuild.ram && newBuild.ram.type !== part.memory) {
          newBuild.ram = null;
        }
      }
      return newBuild;
    });
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(c => c + 1);
  };

  // --- DRAG AND DROP HANDLERS ---
  const handleDragStart = (e, part, type) => {
    e.dataTransfer.setData('part', JSON.stringify(part));
    e.dataTransfer.setData('type', type);
    setDraggedType(type);
  };

  const handleDragEnd = () => {
    setDraggedType(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, targetType) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    
    // Allow dropping if types match OR if general drop logic applies
    if (type === targetType) {
      const part = JSON.parse(e.dataTransfer.getData('part'));
      handleSelect(part);
      setDraggedType(null);
    }
  };

  // Helper for drop zone styling
  const getDropZoneClass = (targetType) => {
    return draggedType === targetType 
      ? "ring-4 ring-yellow-400 ring-opacity-70 bg-yellow-400/10 transition-all scale-[1.02]" 
      : "";
  };

  const currentParts = getCompatibleParts(STEPS[currentStep].key);
  const StepIcon = STEPS[currentStep].icon;

  const amazonLink = (name) => `https://www.amazon.in/s?k=${encodeURIComponent(name)}`;

  // Styling Helpers based on isDarkMode
  const bgMain = isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-800';
  const panelBg = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100';
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const subTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-100';
  const cardHover = isDarkMode ? 'hover:border-orange-500' : 'hover:border-orange-200';
  const cardSelected = isDarkMode ? 'border-orange-500 bg-orange-900/20' : 'border-orange-500 bg-orange-50';
  const rightPanelBg = isDarkMode ? 'bg-slate-950' : 'bg-slate-100';

  return (
    <div className={`min-h-screen font-sans flex flex-col md:flex-row transition-colors duration-300 ${bgMain}`}>
      <style>{`
        @keyframes spin-fast { to { transform: rotate(360deg); } }
        @keyframes rgb-flow { 
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rgb {
          background: linear-gradient(270deg, #ff0000, #00ff00, #0000ff, #ff0000);
          background-size: 600% 600%;
          animation: rgb-flow 3s ease infinite;
        }
        .fan-spin { animation: spin-fast 0.6s linear infinite; }
        .fan-spin-fast { animation: spin-fast 0.3s linear infinite; }
        .shadow-glow-rgb { filter: drop-shadow(0 0 5px rgba(255, 0, 255, 0.5)); }
      `}</style>

      {/* LEFT PANEL: Wizard & Selection */}
      <div className={`w-full md:w-1/2 lg:w-5/12 p-4 md:p-6 overflow-y-auto h-screen shadow-xl z-10 transition-colors duration-300 ${panelBg}`}>
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold flex items-center gap-2 ${headingColor}`}>
              <span className="bg-orange-500 text-white p-1 rounded">PC</span> Builder <span className={`text-sm font-normal ${subTextColor}`}>India Edition</span>
            </h1>
            <p className={`${subTextColor} mt-2 text-sm`}>Drag and drop parts into the case to build your rig.</p>
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Progress Bar */}
        <div className="flex justify-between mb-6 relative">
          <div className={`absolute top-1/2 left-0 w-full h-1 -z-0 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
          {STEPS.map((step, idx) => {
            const isCompleted = build[step.key] !== null;
            const isActive = idx === currentStep;
            return (
              <button 
                key={step.key}
                onClick={() => setCurrentStep(idx)}
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isActive ? 'bg-orange-600 text-white scale-110 shadow-lg ring-4 ring-orange-100' : 
                  isCompleted ? 'bg-green-500 text-white' : 
                  isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isCompleted && !isActive ? <CheckCircle2 size={16} /> : idx + 1}
              </button>
            );
          })}
        </div>

        {/* Selection Area */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className={`text-xl font-semibold flex items-center gap-2 ${headingColor}`}>
            <StepIcon className="text-orange-600" />
            Select {STEPS[currentStep].label}
          </h2>
          {build[STEPS[currentStep].key] && (
             <button onClick={nextStep} className="text-sm text-blue-500 hover:text-blue-400 hover:underline">Next Step &rarr;</button>
          )}
        </div>

        <div className="space-y-3 pb-24">
          {currentParts.length === 0 ? (
             <div className={`p-4 rounded border ${isDarkMode ? 'bg-yellow-900/20 text-yellow-200 border-yellow-700' : 'bg-yellow-50 text-yellow-800 border-yellow-200'}`}>
               Please select a compatible CPU/Motherboard first to see options here.
             </div>
          ) : (
            currentParts.map(part => {
              const isSelected = build[STEPS[currentStep].key]?.id === part.id;
              return (
                <div 
                  key={part.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, part, STEPS[currentStep].key)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleSelect(part)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md flex justify-between items-center group active:cursor-grabbing ${isSelected ? cardSelected : `${cardBg} ${cardHover}`}`}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className={`${isDarkMode ? 'text-slate-600' : 'text-slate-300'} cursor-grab active:cursor-grabbing`} size={20} />
                    <div>
                      <div className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{part.name}</div>
                      <div className={`text-xs mt-1 flex gap-2 ${subTextColor}`}>
                        {part.socket && <span className={`${isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-gray-100 text-gray-600'} px-2 py-0.5 rounded`}>{part.socket}</span>}
                        {part.type && <span className={`${isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-gray-100 text-gray-600'} px-2 py-0.5 rounded`}>{part.type}</span>}
                        {part.speed && <span className={`${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-600'} px-2 py-0.5 rounded`}>{part.speed}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-lg ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>₹{part.price.toLocaleString('en-IN')}</div>
                    {isSelected && <span className="text-xs font-bold text-orange-600 flex items-center justify-end gap-1"><CheckCircle2 size={12} /> Selected</span>}
                    
                    <a 
                      href={amazonLink(part.name)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-blue-500 hover:text-blue-400 mt-2 flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Amazon.in <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Mobile Footer */}
        <div className={`md:hidden fixed bottom-0 left-0 w-full border-t p-4 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
            <div>
              <div className={`text-xs ${subTextColor}`}>Total</div>
              <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{totalPrice.toLocaleString('en-IN')}</div>
            </div>
            <button onClick={nextStep} className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-orange-200 active:scale-95 transition-transform">
              {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
            </button>
        </div>

      </div>

      {/* RIGHT PANEL: Visualizer & Summary */}
      <div className={`hidden md:flex flex-col w-1/2 lg:w-7/12 p-8 h-screen sticky top-0 transition-colors duration-300 ${rightPanelBg}`}>
        
        {/* The Visualizer Case */}
        <div className="flex-1 flex flex-col items-center justify-center relative perspective-1000">
            <div className="absolute top-0 right-0 p-4 z-20 pointer-events-none">
                 <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-500 flex items-center gap-2 shadow-sm animate-pulse">
                     <MousePointerClick size={14} /> Interactive & Draggable
                 </div>
            </div>

          {/* CASE DROP ZONE */}
          <div 
             onDragOver={handleDragOver}
             onDrop={(e) => handleDrop(e, 'case')}
             onClick={() => setCurrentStep(6)}
             className={`relative w-[400px] h-[550px] bg-slate-800 rounded-3xl border-8 border-slate-700 shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:shadow-orange-500/20 group/case ${build.case?.color === 'white' ? 'bg-slate-200 border-slate-300' : ''} ${getDropZoneClass('case')}`}
          >
            
            {/* Glass Panel Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-20 pointer-events-none rounded-2xl"></div>

            {/* CASE FANS (Visual Only) - Always render if case is selected */}
            {build.case && (
                <>
                    {/* Front Fans */}
                    <div className="absolute top-10 right-4 w-12 h-64 flex flex-col justify-between z-10 opacity-80 pointer-events-none">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-500 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                                <Fan size={32} className="text-slate-400 fan-spin" />
                            </div>
                        ))}
                    </div>
                    {/* Rear Fan */}
                    <div className="absolute top-12 left-4 w-12 h-12 rounded-full border-2 border-slate-500 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10 opacity-80 pointer-events-none">
                         <Fan size={32} className="text-slate-400 fan-spin" />
                    </div>
                </>
            )}

            {/* MOTHERBOARD DROP ZONE */}
            {build.motherboard ? (
              <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'motherboard')}
                onClick={(e) => { e.stopPropagation(); setCurrentStep(1); }}
                className={`absolute top-8 left-8 right-8 bottom-24 bg-slate-900 border border-slate-700 rounded-lg shadow-inner flex flex-col p-4 animate-in fade-in zoom-in duration-500 cursor-pointer hover:border-orange-500/50 transition-colors group/mobo ${getDropZoneClass('motherboard')}`}
              >
                {/* Mobo ambient glow */}
                <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none z-0"></div>
                
                <div className="w-full h-8 bg-slate-800 rounded mb-2 flex items-center px-2 relative z-10 border-b border-slate-700/50">
                    <div className="w-16 h-4 bg-slate-600 rounded"></div>
                    <div className="ml-auto text-[10px] text-slate-500 group-hover/mobo:text-orange-400 transition-colors">{build.motherboard.name}</div>
                </div>
                
                {/* CPU SOCKET DROP ZONE */}
                <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => { e.stopPropagation(); handleDrop(e, 'cpu'); }}
                    onClick={(e) => { e.stopPropagation(); setCurrentStep(0); }}
                    className={`mx-auto mt-4 w-32 h-32 border-2 border-dashed border-slate-600 rounded flex items-center justify-center relative bg-slate-800/50 hover:bg-slate-800 hover:border-orange-500 cursor-pointer transition-all group/cpu z-10 ${getDropZoneClass('cpu')}`}
                >
                   {build.cpu ? (
                     <div className="relative w-28 h-28 flex items-center justify-center">
                        {/* The CPU itself */}
                        <div className="w-24 h-24 bg-gradient-to-br from-slate-300 to-slate-400 rounded shadow-lg flex items-center justify-center border border-slate-200 z-10">
                           <div className="text-center">
                               <Cpu size={32} className={build.cpu.type === 'AMD' ? 'text-orange-600' : 'text-blue-600'} />
                               <div className="text-[9px] font-bold mt-1 text-slate-700">{build.cpu.name.split(' ')[0]}</div>
                           </div>
                        </div>
                        {/* The Cooler Fan Overlay - Working! */}
                        <div className="absolute inset-0 z-20 bg-black/80 rounded-full border-4 border-slate-700 shadow-xl flex items-center justify-center animate-in zoom-in duration-500">
                             <div className="w-full h-full rounded-full border-2 border-slate-600 flex items-center justify-center opacity-80">
                                 <Fan size={64} className="text-slate-200 fan-spin-fast" />
                             </div>
                             {/* Central Logo */}
                             <div className="absolute w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border border-slate-500">
                                 <div className={`w-2 h-2 rounded-full ${build.cpu.type === 'AMD' ? 'bg-orange-500' : 'bg-blue-500'} animate-pulse`}></div>
                             </div>
                        </div>
                     </div>
                   ) : <div className="text-slate-600 text-xs group-hover/cpu:text-orange-400 pointer-events-none">CPU Socket</div>}
                </div>

                {/* RAM SLOTS DROP ZONE */}
                <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => { e.stopPropagation(); handleDrop(e, 'ram'); }}
                    onClick={(e) => { e.stopPropagation(); setCurrentStep(2); }}
                    className={`absolute top-16 right-8 flex gap-1 h-32 hover:scale-105 transition-transform cursor-pointer p-1 rounded hover:bg-slate-800/50 z-10 ${getDropZoneClass('ram')}`}
                    title="Drag RAM here"
                >
                  {[1,2,3,4].map((slot) => (
                    <div key={slot} className="w-2 h-full bg-slate-800 border border-slate-700 rounded-sm relative">
                        {build.ram && (slot === 2 || slot === 4) && (
                            <div className={`absolute inset-0 ${build.ram.color === 'black' ? 'bg-black border-slate-600' : build.ram.color === 'red' ? 'bg-red-700' : build.ram.color === 'white' ? 'bg-slate-200' : 'bg-green-600'} rounded-sm shadow-md animate-in slide-in-from-top-4 duration-500 overflow-hidden`}>
                                {/* RGB Effect for RAM */}
                                <div className="absolute top-0 w-full h-full animate-rgb opacity-80 mix-blend-overlay"></div>
                                <div className="absolute top-1 w-full h-4 bg-white/50 blur-[2px] animate-pulse"></div>
                            </div>
                        )}
                    </div>
                  ))}
                </div>

                {/* GPU SLOT DROP ZONE */}
                <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => { e.stopPropagation(); handleDrop(e, 'gpu'); }}
                    onClick={(e) => { e.stopPropagation(); setCurrentStep(3); }}
                    className={`mt-auto mb-4 relative min-h-[100px] flex items-end cursor-pointer hover:bg-slate-800/30 rounded p-2 transition-colors border border-transparent hover:border-slate-700 z-10 ${getDropZoneClass('gpu')}`}
                    title="Drag GPU here"
                >
                    {/* PCIe Slots */}
                    <div className="absolute w-full h-2 bg-slate-700 top-2 rounded"></div>
                    <div className="absolute w-full h-2 bg-slate-700 top-8 rounded opacity-50"></div>
                    
                    {build.gpu && build.gpu.id !== 'g0' ? (
                        <div className="absolute bottom-6 left-0 w-full h-24 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg border border-slate-700 shadow-2xl flex items-center px-6 animate-in slide-in-from-left duration-500 z-20 overflow-hidden">
                            {/* RGB Strip on GPU */}
                            <div className="absolute top-0 left-0 w-full h-1 animate-rgb"></div>
                            
                            {/* Fans */}
                            <div className="w-16 h-16 rounded-full border-4 border-slate-700 flex items-center justify-center bg-black/40 relative">
                                <Fan size={48} className="text-slate-600 fan-spin-fast" />
                            </div>
                            <div className="w-16 h-16 rounded-full border-4 border-slate-700 ml-4 flex items-center justify-center bg-black/40 relative">
                                <Fan size={48} className="text-slate-600 fan-spin-fast" />
                            </div>
                            
                            {/* Glowing Text */}
                            <div className="ml-auto text-xs font-bold text-white/20 tracking-wider uppercase rotate-90 origin-right translate-x-4 shadow-glow-rgb animate-pulse">
                                GEFORCE
                            </div>
                        </div>
                    ) : (
                        <div className="w-full text-center text-xs text-slate-600 mt-8 pointer-events-none">GPU Area</div>
                    )}
                </div>
              </div>
            ) : (
                 <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'motherboard')}
                    className={`absolute inset-4 m-4 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center text-slate-500 ${getDropZoneClass('motherboard')}`}
                 >
                    Drag Motherboard Here
                 </div>
            )}

            {/* PSU SHROUD DROP ZONE */}
            <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'psu')}
                onClick={(e) => { e.stopPropagation(); setCurrentStep(5); }}
                className={`absolute bottom-0 w-full h-24 ${build.case?.color === 'white' ? 'bg-slate-300' : 'bg-slate-900'} border-t border-slate-700 flex items-center justify-center cursor-pointer hover:brightness-110 transition-all z-20 ${getDropZoneClass('psu')}`}
            >
                {build.psu ? (
                    <div className="text-xs text-slate-500 font-mono text-center flex flex-col items-center">
                        <Zap className="mb-1 text-yellow-400 animate-pulse" size={20} fill="currentColor" />
                        <span className="text-yellow-100 font-bold tracking-widest">{build.psu.watts}W ACTIVE</span>
                    </div>
                ) : <span className="text-slate-700 text-xs hover:text-orange-400 pointer-events-none">PSU Shroud (Drag PSU Here)</span>}
            </div>

            {/* STORAGE DROP ZONE */}
            <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'storage')}
                onClick={(e) => { e.stopPropagation(); setCurrentStep(4); }}
                className={`absolute bottom-28 right-10 w-20 h-8 border border-dashed border-slate-600 hover:border-orange-500 rounded flex items-center justify-center cursor-pointer hover:bg-slate-800/80 transition-all z-20 ${getDropZoneClass('storage')}`}
            >
                 {build.storage ? (
                    <div className="w-full h-full bg-slate-800 border border-green-500/50 rounded flex items-center justify-center shadow-[0_0_10px_rgba(0,255,0,0.2)] animate-in zoom-in">
                        <span className="text-[8px] text-green-400 font-mono animate-pulse">NVMe ACTIVE</span>
                    </div>
                 ) : <span className="text-[8px] text-slate-500 pointer-events-none">Storage</span>}
            </div>

          </div>

          {/* Messages / Warnings */}
          <div className="mt-6 w-[400px]">
             {totalTDP > (build.psu?.watts || 0) && build.psu && (
                 <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2 mb-2">
                    <AlertCircle size={16} /> Warning: Est. Wattage ({totalTDP}W) exceeds PSU ({build.psu.watts}W)!
                 </div>
             )}
             {build.cpu && build.motherboard && (
                 <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm flex items-center gap-2">
                    <CheckCircle2 size={16} /> Compatibility Check: Passed ({build.cpu.socket})
                 </div>
             )}
          </div>

        </div>

        {/* Summary Footer */}
        <div className={`rounded-2xl p-6 shadow-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
           <div className="flex justify-between items-end mb-4">
              <div>
                  <h3 className={`text-sm font-bold uppercase tracking-wide ${subTextColor}`}>Estimated Total</h3>
                  <div className={`text-4xl font-bold flex items-center ${headingColor}`}>
                    <IndianRupee size={32} strokeWidth={2.5} />
                    {totalPrice.toLocaleString('en-IN')}
                  </div>
              </div>
              <div className="text-right">
                  <div className={`text-xs mb-1 ${subTextColor}`}>Estimated Wattage</div>
                  <div className={`text-xl font-bold ${totalTDP > 500 ? 'text-orange-600' : isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{totalTDP}W</div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-3">
               <button 
                  onClick={() => {
                      if (build.cpu) window.open(amazonLink(build.cpu.name), '_blank');
                      if (build.gpu) window.open(amazonLink(build.gpu.name), '_blank');
                      // In a real app, this would add all to a cart or open multiple tabs
                      alert("Opening search results for your primary components on Amazon.in!");
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
               >
                   <ShoppingCart size={18} /> Buy All on Amazon
               </button>
               <button 
                  onClick={() => setBuild({cpu:null, motherboard:null, ram:null, gpu:null, storage:null, psu:null, case:null})}
                  className={`${isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors`}
               >
                   <RotateCcw size={18} /> Reset Build
               </button>
           </div>
        </div>

      </div>
    </div>
  );
}