import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList
} from 'recharts';
import { 
  Users, GraduationCap, Brain, Briefcase, Heart, 
  Monitor, MapPin, Globe, Info, ExternalLink, Clock, BookOpen, Microscope
} from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
const SAT_COLORS = ['#16a34a', '#84cc16', '#facc15', '#ef4444'];

const ALMALAUREA_URL = "https://www2.almalaurea.it/cgi-php/universita/statistiche/visualizza.php?anno=2024&corstipo=L&ateneo=tutti&facolta=tutti&gruppo=10&livello=1&area4=4&pa=tutti&classe=10026&postcorso=tutti&isstella=0&regione=tutti&dimensione=tutti&presiui=tutti&cs_univ=tutti&cs_facoa=tutti&cs_corsb=tutti&disaggregazione=&LANG=it&CONFIG=profilo";

const App = () => {
  const [lang, setLang] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    return (urlLang === 'en' || urlLang === 'it') ? urlLang : 'it';
  });
  const [activeTab, setActiveTab] = useState(() => {
    // Initialize from URL hash
    const hash = window.location.hash.slice(1);
    const validTabs = ['overview', 'studies', 'experience', 'future'];
    return validTabs.includes(hash) ? hash : 'overview';
  });
  const [showCohortInfo, setShowCohortInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Sync state with URL (hash and query params)
  useEffect(() => {
    const handleUrlChange = () => {
      // Sync Tab
      const hash = window.location.hash.slice(1);
      const validTabs = ['overview', 'studies', 'experience', 'future'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }

      // Sync Lang
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || urlLang === 'it') {
        setLang(urlLang);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.history.pushState(null, '', `#${tab}`);
  };

  // Update URL query param when language changes
  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    const params = new URLSearchParams(window.location.search);
    params.set('lang', newLang);
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.pushState(null, '', newUrl);
  };

  const t = {
    it: {
      title: "Laureati in Informatica (L-31) - 2024",
      subtitle: "Analisi statistica basata sui dati ",
      cohortInfo: "Dettagli Coorte Selezionata",
      numGraduates: "Numero di laureati",
      completedQuest: "Questionari compilati",
      responseRate: "Tasso di risposta",
      tabs: {
        overview: "Anagrafica & Sociale",
        studies: "Riuscita negli Studi",
        experience: "Esperienza & Servizi",
        future: "Skill & Prospettive"
      },
      cards: {
        gender: "Genere",
        age: "Età alla laurea",
        social: "Origine Sociale",
        regularity: "Regolarità degli Studi",
        diploma: "Diploma di Provenienza",
        satisfaction: "Soddisfazione (%)",
        facilities: "Valutazione Strutture",
        skills: "Competenze Informatiche",
        prospects: "Prospettive Post-Laurea",
        enrolment: "Iscrizione"
      },
      reasons: {
        title: "Motivazione scelta",
        both: "Culturale + Professionale",
        cultural: "Solo Culturale",
        professional: "Solo Professionale"
      },
      stats: {
        voto: "Media Voto",
        durata: "Durata Media",
        anni: "anni",
        parentGrad: "Almeno un genitore laureato",
        noParentGrad: "Nessun genitore laureato",
        mobility: "Mobilità Geografica",
        mobilityText: "Il 48,4% studia nella propria provincia, mentre il 18,1% si sposta in un'altra regione.",
        reEnroll: "Si iscriverebbero di nuovo?",
        jobSeek: "Cosa cercano nel lavoro?",
        avgAge: "Età media: 24,5 anni",
        enrolledWithin: "Iscritti entro 1 anno dal diploma",
        workload: "Carico di studio adeguato"
      },
      labels: {
        male: "Uomini",
        female: "Donne",
        inCourse: "In corso",
        decidedlyYes: "Decisamente sì",
        moreYes: "Più sì che no",
        moreNo: "Più no che sì",
        decidedlyNo: "Decisamente no",
        usage: "Utilizzo"
      }
    },
    en: {
      title: "Computer Science Graduates (L-31) - 2024",
      subtitle: "Statistical analysis based on ",
      cohortInfo: "Selected Cohort Details",
      numGraduates: "Number of graduates",
      completedQuest: "Completed questionnaires",
      responseRate: "Response rate",
      tabs: {
        overview: "Personal & Social",
        studies: "Academic Performance",
        experience: "Experience & Services",
        future: "Skills & Prospects"
      },
      cards: {
        gender: "Gender",
        age: "Age at Graduation",
        social: "Social Background",
        regularity: "Degree Completion Time",
        diploma: "Upper Secondary Education",
        satisfaction: "Satisfaction (%)",
        facilities: "Facilities Assessment",
        skills: "IT Skills",
        prospects: "Prospects for Further Studies",
        enrolment: "Enrolment"
      },
      reasons: {
        title: "Reason for choice",
        both: "Cultural & Professional",
        cultural: "Mainly Cultural",
        professional: "Mainly Professional"
      },
      stats: {
        voto: "Graduation Mark",
        durata: "Average Duration",
        anni: "years",
        parentGrad: "At least one parent with a degree",
        noParentGrad: "No parent with a degree",
        mobility: "Geographical Mobility",
        mobilityText: "48.4% study in the same province, while 18.1% move from another region.",
        reEnroll: "Would enroll again?",
        jobSeek: "Job search priorities",
        avgAge: "Average age: 24.5 years",
        enrolledWithin: "Enrolled within 1y from diploma",
        workload: "Adequate workload"
      },
      labels: {
        male: "Male",
        female: "Female",
        inCourse: "Within prescribed time",
        decidedlyYes: "Definitely yes",
        moreYes: "More yes than no",
        moreNo: "More no than yes",
        decidedlyNo: "Definitely no",
        usage: "Usage"
      }
    }
  }[lang]!;

  const ageData = [
    { range: '< 23', value: 41.3 },
    { range: '23-24', value: 31.7 },
    { range: '25-26', value: 14.3 },
    { range: '27+', value: 12.7 },
  ];

  const genderData = [
    { name: t.labels.male, value: 85.5 },
    { name: t.labels.female, value: 14.5 },
  ];

  const socialData = [
    { name: t.stats.parentGrad, value: 28.9, fill: '#3b82f6' },
    { name: t.stats.noParentGrad, value: 68.9, fill: '#f97316' },
  ];

  const regularityData = [
    { name: t.labels.inCourse, value: 45.8 },
    { name: '1y+', value: 23.0 },
    { name: '2y+', value: 13.4 },
    { name: '3y+', value: 7.2 },
    { name: '4y+', value: 4.0 },
    { name: '5y++', value: 6.5 },
  ];

  const satisfactionData = [
    { category: lang === 'it' ? 'Corso' : 'Program', decisi: 37.5, piuSi: 51.4, piuNo: 8.8, decisNo: 1.0 },
    { category: lang === 'it' ? 'Didattica' : 'Teaching', decisi: 27.0, piuSi: 61.0, piuNo: 9.4, decisNo: 1.0 },
    { category: lang === 'it' ? 'Docenti' : 'Teachers', decisi: 22.1, piuSi: 63.5, piuNo: 12.1, decisNo: 1.0 },
    { category: lang === 'it' ? 'Studenti' : 'Students', decisi: 51.3, piuSi: 39.4, piuNo: 6.4, decisNo: 1.5 },
  ];

  const workloadData = [
    { category: lang === 'it' ? 'Carico studio' : 'Workload', decisi: 41.2, piuSi: 40.8, piuNo: 14.2, decisNo: 2.8 }
  ];

  const skillsData = [
    { name: lang === 'it' ? 'Programmazione' : 'Programming', value: 92.6 },
    { name: 'Internet', value: 94.6 },
    { name: lang === 'it' ? 'Sistemi Operativi' : 'Operating Systems', value: 85.7 },
    { name: lang === 'it' ? 'Database' : 'Databases', value: 78.3 },
    { name: 'Web', value: 72.9 },
    { name: lang === 'it' ? 'Reti' : 'Networks', value: 61.7 },
  ];

  const futureData = [
    { name: lang === 'it' ? 'Magistrale' : "Master's degree", value: 57.4 },
    { name: lang === 'it' ? 'Lavoro' : 'Work', value: 33.8 },
    { name: lang === 'it' ? 'Altro' : 'Other', value: 8.8 },
  ];

  const reEnrollData = [
    { name: lang === 'it' ? 'Stesso corso/Ateneo' : 'Same course/University', value: 74.7 },
    { name: lang === 'it' ? 'Altro corso/Ateneo' : 'Other course/University', value: 6.5 },
    { name: lang === 'it' ? 'Stesso corso/Altro Ateneo' : 'Same course/Other University', value: 9.7 },
    { name: lang === 'it' ? 'Altro corso/Altro Ateneo' : 'Other course/Other University', value: 4.0 },
    { name: lang === 'it' ? 'Non si iscriverebbero' : 'No university', value: 3.8 },
  ];

  const renderCard = (title: string, icon: React.ReactNode, content: React.ReactNode) => (
    <div className={`p-5 rounded-xl shadow-sm border flex flex-col h-full transition-colors ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center mb-4 space-x-3 text-blue-600">
        {icon}
        <h3 className={`font-bold text-md uppercase tracking-tight ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>{title}</h3>
      </div>
      <div className="flex-1 pb-2">
        {content}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-4 md:p-8 font-sans transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-2xl md:text-3xl font-extrabold leading-tight ${
              darkMode ? 'text-blue-400' : 'text-blue-900'
            }`}>
              {t.title}
            </h1>
            <div className="relative inline-block">
              <button 
                onClick={() => setShowCohortInfo(!showCohortInfo)}
                className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              >
                <Info size={20} />
              </button>
              {showCohortInfo && (
                <div className="absolute left-0 top-10 z-50 w-64 bg-white bg-opacity-100 border border-gray-200 shadow-xl rounded-lg p-4 text-sm animate-in fade-in zoom-in-95">
                  <h4 className="font-bold text-blue-800 mb-2 border-b pb-1">{t.cohortInfo}</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-black"><span>{t.numGraduates}:</span> <span className="font-mono font-bold text-black">4.171</span></div>
                    <div className="flex justify-between text-black"><span>{t.completedQuest}:</span> <span className="font-mono font-bold text-black">3.911</span></div>
                    <div className="flex justify-between text-black border-t pt-1 mt-1"><span>{t.responseRate}:</span> <span className="font-mono font-bold text-green-600">93.8%</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-500 font-medium">
            {t.subtitle} 
            <a href={ALMALAUREA_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
              AlmaLaurea <ExternalLink size={12} />
            </a>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-10 rounded-full shadow-md transition-all font-bold text-xl ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' 
                : 'bg-white hover:bg-gray-100 text-gray-800'
            }`}
            title={darkMode ? (lang === 'it' ? 'Tema chiaro' : 'Light theme') : (lang === 'it' ? 'Tema scuro' : 'Dark theme')}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <button 
            onClick={() => handleLangChange(lang === 'it' ? 'en' : 'it')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-full shadow-md hover:bg-blue-700 transition-all font-bold text-sm"
          >
            <Globe size={18} />
            <span>{lang === 'it' ? 'ENGLISH' : 'ITALIANO'}</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-6xl mx-auto mb-8 px-4 md:px-0 flex justify-center">
        <div className="flex flex-wrap gap-2 bg-gray-200/50 p-1.5 rounded-xl w-full md:w-fit">
          {Object.entries(t.tabs).map(([id, label]) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 md:px-6 py-2.5 md:py-3 rounded-lg text-xs sm:text-sm md:text-[15px] font-bold transition-all whitespace-nowrap ${
                activeTab === id 
                ? (darkMode ? 'bg-gray-700 text-blue-400 shadow-md' : 'bg-white text-blue-700 shadow-md')
                : (darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50' : 'text-gray-500 hover:text-gray-700')
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeTab === 'overview' && (
          <>
            {renderCard(t.cards.gender, <Users />, (
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 10, bottom: 10 }}>
                    <Pie
                      data={genderData}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}%`}
                    >
                      {genderData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#db2777'} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1f2937' : '#fff', 
                        borderColor: darkMode ? '#374151' : '#e5e7eb'
                      }}
                      itemStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                      labelStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}

            {renderCard(t.cards.age, <Clock />, (
              <div className="h-60 flex flex-col">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#374151' : '#f0f0f0'} />
                      <XAxis dataKey="range" stroke={darkMode ? '#9ca3af' : '#6b7280'} tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} />
                      <YAxis unit="%" stroke={darkMode ? '#9ca3af' : '#6b7280'} tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1f2937' : '#fff', 
                          borderColor: darkMode ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: darkMode ? '#60a5fa' : '#2563eb' }}
                        labelStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                        cursor={{ fill: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 py-2 bg-blue-50/50 rounded text-center">
                  <span className="text-sm font-bold text-blue-700">{t.stats.avgAge}</span>
                </div>
              </div>
            ))}

            {renderCard(t.cards.social, <MapPin />, (
              <div className="space-y-4">
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={socialData} 
                      layout="vertical" 
                      margin={{ left: 0, right: 45, top: 20, bottom: 5 }}
                    >
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" hide />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1f2937' : '#fff', 
                          borderColor: darkMode ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                        labelStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                        cursor={{ fill: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                        <LabelList 
                          dataKey="name" 
                          position="top" 
                          offset={8}
                          style={{ fill: darkMode ? '#e5e7eb' : '#1f2937', fontSize: '12px' }} 
                        />
                        <LabelList 
                          dataKey="value" 
                          position="right" 
                          formatter={(v: number) => `${v}%`} 
                          style={{ fill: darkMode ? '#60a5fa' : '#2563eb', fontSize: '14px' }} 
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className={`mt-4 p-4 border-l-4 rounded-r-lg ${
                  darkMode 
                    ? 'border-blue-500 bg-blue-900/30' 
                    : 'border-blue-400 bg-blue-50'
                }`}>
                  <h4 className={`text-[15px] font-bold uppercase mb-1 ${
                    darkMode ? 'text-blue-300' : 'text-blue-800'
                  }`}>{t.stats.mobility}</h4>
                  <p className={`text-[12px] leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t.stats.mobilityText}</p>
                </div>
              </div>
            ))}
            
            {renderCard(t.cards.diploma, <Brain />, (
              <div className="space-y-4">
                 {/* Multi-level Pie Chart */}
                 <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       {/* Outer ring - Main categories */}
                       <Pie
                         data={[
                           { name: lang === 'it' ? 'Liceale' : 'High School', value: 44.6, fill: '#059669' },
                           { name: lang === 'it' ? 'Tecnico' : 'Technical', value: 51.9, fill: '#2563eb' },
                           { name: lang === 'it' ? 'Professionale' : 'Vocational', value: 1.7, fill: '#f97316' },
                           { name: lang === 'it' ? 'Estero' : 'Foreign', value: 1.7, fill: '#a855f7' }
                         ]}
                         dataKey="value"
                         cx="50%"
                         cy="50%"
                         outerRadius={80}
                         innerRadius={50}
                         label={({name, value}) => `${name}: ${value}%`}
                         labelLine={{ stroke: '#666', strokeWidth: 1 }}
                       />
                       {/* Inner ring - Subtypes */}
                       <Pie
                         data={[
                           { name: lang === 'it' ? 'Scientifico' : 'Scientific', value: 38.3, fill: '#10b981' },
                           { name: lang === 'it' ? 'Classico' : 'Classical', value: 2.5, fill: '#34d399' },
                           { name: lang === 'it' ? 'Linguistico' : 'Linguistic', value: 2.2, fill: '#6ee7b7' },
                           { name: lang === 'it' ? 'Scienze umane' : 'Human Sci.', value: 1.0, fill: '#a7f3d0' },
                           { name: lang === 'it' ? 'Artistico' : 'Arts', value: 0.6, fill: '#d1fae5' },
                           { name: lang === 'it' ? 'Tec. Tecnologico' : 'Tech. Tech.', value: 40.5, fill: '#3b82f6' },
                           { name: lang === 'it' ? 'Tec. Economico' : 'Tech. Econ.', value: 11.5, fill: '#93c5fd' },
                           { name: lang === 'it' ? 'Professionale' : 'Vocational', value: 1.7, fill: '#f97316' },
                           { name: lang === 'it' ? 'Estero' : 'Foreign', value: 1.7, fill: '#a855f7' }
                         ]}
                         dataKey="value"
                         cx="50%"
                         cy="50%"
                         outerRadius={48}
                         innerRadius={0}
                       />
                       <Tooltip 
                         contentStyle={{ 
                           backgroundColor: darkMode ? '#1f2937' : '#fff', 
                           borderColor: darkMode ? '#374151' : '#e5e7eb'
                         }}
                         itemStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                         labelStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                       />
                     </PieChart>
                   </ResponsiveContainer>
                 </div>

                 {/* Detailed breakdown */}
                 {/*<div className="grid grid-cols-2 gap-3">*/}
                   {/* Licei */}
                   {/* <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                     <h4 className="text-[10px] font-bold text-emerald-800 uppercase mb-2">{lang === 'it' ? '🎓 Licei' : '🎓 High Schools'}</h4>
                     <div className="space-y-1.5 text-[10px]">
                       <div className="flex justify-between"><span>{lang === 'it' ? 'Scientifico' : 'Scientific'}</span> <b className="text-emerald-700">38.3%</b></div>
                       <div className="flex justify-between"><span>{lang === 'it' ? 'Classico' : 'Classical'}</span> <b className="text-emerald-700">2.5%</b></div>
                       <div className="flex justify-between"><span>{lang === 'it' ? 'Linguistico' : 'Linguistic'}</span> <b className="text-emerald-700">2.2%</b></div>
                       <div className="flex justify-between"><span>{lang === 'it' ? 'Scienze umane' : 'Human Sciences'}</span> <b className="text-emerald-700">1.0%</b></div>
                       <div className="flex justify-between"><span>{lang === 'it' ? 'Artistico/Musicale' : 'Arts/Music'}</span> <b className="text-emerald-700">0.6%</b></div>
                     </div>
                   </div> */}

                   {/* Tecnici */}
                   {/* <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                     <h4 className="text-[10px] font-bold text-blue-800 uppercase mb-2">{lang === 'it' ? '⚙️ Tecnici' : '⚙️ Technical'}</h4>
                     <div className="space-y-1.5 text-[10px]">
                       <div className="flex justify-between"><span>{lang === 'it' ? 'Tecnologico' : 'Technological'}</span> <b className="text-blue-700">40.5%</b></div>
                       <div className="flex justify-between"><span>{lang === 'it' ? 'Economico' : 'Economic'}</span> <b className="text-blue-700">11.5%</b></div>
                     </div>
                   </div> */}
                 {/*</div>*/}

                 {/* Average diploma grade */}
                 <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200 flex justify-between items-center">
                   <span className="text-s font-bold text-yellow-900">{lang === 'it' ? '📊 Voto medio diploma' : '📊 Average diploma grade'}</span>
                   <span className="text-2xl font-black text-yellow-700">85<span className="text-sm">/100</span></span>
                 </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'studies' && (
          <>
            {renderCard(t.cards.regularity, <GraduationCap />, (
              <div className="space-y-4">
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regularityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#374151' : '#f0f0f0'} />
                      <XAxis dataKey="name" tick={{fontSize: 10, fill: darkMode ? '#9ca3af' : '#6b7280'}} stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                      <YAxis unit="%" stroke={darkMode ? '#9ca3af' : '#6b7280'} tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1f2937' : '#fff', 
                          borderColor: darkMode ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: darkMode ? '#60a5fa' : '#2563eb' }}
                        labelStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                        cursor={{ fill: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                  }`}>
                    <div className={`text-[10px] uppercase font-bold ${
                      darkMode ? 'text-blue-400' : 'text-blue-800'
                    }`}>{t.stats.voto}</div>
                    <div className={`text-xl font-black ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>98.8</div>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
                  }`}>
                    <div className={`text-[10px] uppercase font-bold ${
                      darkMode ? 'text-emerald-400' : 'text-emerald-800'
                    }`}>{t.stats.durata}</div>
                    <div className={`text-xl font-black ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>4.5 <span className="text-xs">{t.stats.anni}</span></div>
                  </div>
                </div>
              </div>
            ))}

            {renderCard(t.cards.enrolment, <Info />, (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <h4 className={`text-[11px] font-bold uppercase mb-3 tracking-wider ${
                    darkMode ? 'text-gray-300' : 'text-gray-400'
                  }`}>{t.reasons.title}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{t.reasons.both}</span> 
                      <b className={darkMode ? 'text-blue-400' : 'text-blue-700'}>51.1%</b>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{t.reasons.cultural}</span> 
                      <b className={darkMode ? 'text-blue-400' : 'text-blue-700'}>20.3%</b>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{t.reasons.professional}</span> 
                      <b className={darkMode ? 'text-blue-400' : 'text-blue-700'}>17.1%</b>
                    </div>
                  </div>
                </div>
                <div className={`p-5 rounded-lg border flex justify-between items-center ${
                  darkMode ? 'bg-blue-900/30 border-blue-700/50' : 'bg-blue-50 border-blue-100'
                }`}>
                     <span className={`text-sm font-bold ${
                       darkMode ? 'text-blue-300' : 'text-blue-900'
                     }`}>{t.stats.enrolledWithin}</span>
                     <span className={`text-2xl font-black ${
                       darkMode ? 'text-blue-400' : 'text-blue-600'
                     }`}>86.8%</span>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'experience' && (
          <>
            {renderCard(t.cards.satisfaction, <Heart />, (
              <div className="space-y-4 overflow-y-auto max-h-[70 0px] pr-1">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={satisfactionData} layout="vertical" margin={{ right: 30, left: -10 }}>
                      <XAxis type="number" domain={[0, 100]} stroke={darkMode ? '#9ca3af' : '#6b7280'} tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} />
                      <YAxis dataKey="category" type="category" width={80} tick={{fontSize: 10, fill: darkMode ? '#9ca3af' : '#6b7280'}} stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1f2937' : '#fff', 
                          borderColor: darkMode ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                        labelStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                        cursor={{ fill: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} />
                      <Bar name={t.labels.decidedlyYes} dataKey="decisi" stackId="a" fill={SAT_COLORS[0]} />
                      <Bar name={t.labels.moreYes} dataKey="piuSi" stackId="a" fill={SAT_COLORS[1]} />
                      <Bar name={t.labels.moreNo} dataKey="piuNo" stackId="a" fill={SAT_COLORS[2]} />
                      <Bar name={t.labels.decidedlyNo} dataKey="decisNo" stackId="a" fill={SAT_COLORS[3]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Carico di studio */}
                <div className={`p-3 rounded-lg border-2 shadow-sm ${
                  darkMode ? 'bg-gray-800 border-green-900/50' : 'bg-white border-green-100'
                }`}>
                  <h4 className={`text-[11px] font-bold uppercase mb-2 ${
                    darkMode ? 'text-green-400' : 'text-green-800'
                  }`}>{t.stats.workload}</h4>
                  <div className="h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={workloadData} layout="vertical">
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis dataKey="category" type="category" hide />
                        <Bar name={t.labels.decidedlyYes} dataKey="decisi" stackId="v" fill={SAT_COLORS[0]} />
                        <Bar name={t.labels.moreYes} dataKey="piuSi" stackId="v" fill={SAT_COLORS[1]} />
                        <Bar name={t.labels.moreNo} dataKey="piuNo" stackId="v" fill={SAT_COLORS[2]} />
                        <Bar name={t.labels.decidedlyNo} dataKey="decisNo" stackId="v" fill={SAT_COLORS[3]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-[9px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: SAT_COLORS[0]}}></span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>{t.labels.decidedlyYes}</span>
                      <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>41.2%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: SAT_COLORS[1]}}></span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>{t.labels.moreYes}</span>
                      <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>40.8%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: SAT_COLORS[2]}}></span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>{t.labels.moreNo}</span>
                      <span className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>14.2%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: SAT_COLORS[3]}}></span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>{t.labels.decidedlyNo}</span>
                      <span className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>2.8%</span>
                    </div>
                  </div>
                </div>

                {/* Scelta Università */}
                <div className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-purple-900/20 border-purple-800/50' : 'bg-purple-50 border-purple-100'
                }`}>
                  <h4 className={`text-[11px] font-bold uppercase mb-3 text-center ${
                    darkMode ? 'text-purple-300' : 'text-purple-800'
                  }`}>{t.stats.reEnroll}</h4>
                  <div className="space-y-2">
                    {reEnrollData.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className={`${idx === 0 ? 'font-bold' : ''} ${darkMode ? 'text-purple-200' : 'text-purple-900'} pr-2`}>{item.name}</span>
                          <b className={darkMode ? 'text-purple-400' : 'text-purple-700'}>{item.value}%</b>
                        </div>
                        <div className={`w-full h-1 rounded-full overflow-hidden ${
                          darkMode ? 'bg-purple-900/50' : 'bg-purple-200/50'
                        }`}>
                          <div className="bg-purple-600 h-full" style={{width: `${item.value}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {renderCard(t.cards.facilities, <Monitor />, (
              <div className="space-y-4 overflow-y-auto max-h-[450px] pr-1">
                {/* Aule */}
                <div className={`p-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-bold uppercase flex items-center gap-2 ${
                      darkMode ? 'text-blue-400' : 'text-blue-900'
                    }`}><Users size={14}/> {lang === 'it' ? 'Aule' : 'Classrooms'}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>{t.labels.usage}: 97.5%</span>
                  </div>
                  <div className={`flex h-1.5 rounded-full overflow-hidden mb-2 ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <div className="bg-green-600" style={{width: '27.3%'}}></div>
                    <div className="bg-lime-500" style={{width: '52.0%'}}></div>
                    <div className="bg-yellow-400" style={{width: '18.0%'}}></div>
                    <div className="bg-red-500" style={{width: '2.8%'}}></div>
                  </div>
                  <div className={`flex justify-between text-[9px] font-bold uppercase ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>{lang === 'it' ? 'Adeguate' : 'Adequate'}: 79.3%</span>
                    <span>{lang === 'it' ? 'Inadeguate' : 'Inadequate'}: 20.8%</span>
                  </div>
                </div>

                {/* Postazioni PC */}
                <div className={`p-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-bold uppercase flex items-center gap-2 ${
                      darkMode ? 'text-blue-400' : 'text-blue-900'
                    }`}><Monitor size={14}/> PC</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>{t.labels.usage}: 86.4%</span>
                  </div>
                  <div className={`flex h-1.5 rounded-full overflow-hidden mb-2 ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <div className="bg-green-600" style={{width: '61.4%'}}></div>
                    <div className="bg-red-500" style={{width: '38.6%'}}></div>
                  </div>
                  <div className={`flex justify-between text-[9px] font-bold uppercase ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>{lang === 'it' ? 'In Numero Adeguato' : 'Adequate Number'}: 61.4%</span>
                    <span>{lang === 'it' ? 'In Numero Inadeguato' : 'Inadequate Number'}: 38.6%</span>
                  </div>
                </div>

                {/* Laboratori */}
                <div className={`p-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-bold uppercase flex items-center gap-2 ${
                      darkMode ? 'text-blue-400' : 'text-blue-900'
                    }`}><Microscope size={14}/> Labs</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>{t.labels.usage}: 86.9%</span>
                  </div>
                  <div className={`flex h-1.5 rounded-full overflow-hidden mb-2 ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <div className="bg-green-600" style={{width: '28.9%'}}></div>
                    <div className="bg-lime-500" style={{width: '48.9%'}}></div>
                    <div className="bg-yellow-400" style={{width: '19.3%'}}></div>
                    <div className="bg-red-500" style={{width: '2.9%'}}></div>
                  </div>
                  <div className={`flex justify-between text-[9px] font-bold uppercase ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>{lang === 'it' ? 'Adeguati' : 'Adequate'}: 77.8%</span>
                  </div>
                </div>

                {/* Biblioteca */}
                <div className={`p-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-bold uppercase flex items-center gap-2 ${
                      darkMode ? 'text-blue-400' : 'text-blue-900'
                    }`}><BookOpen size={14}/> {lang === 'it' ? 'Biblioteca' : 'Library'}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>{t.labels.usage}: 59.1%</span>
                  </div>
                  <div className={`flex h-1.5 rounded-full overflow-hidden mb-2 ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <div className="bg-green-600" style={{width: '44.3%'}}></div>
                    <div className="bg-lime-500" style={{width: '49.8%'}}></div>
                    <div className="bg-yellow-400" style={{width: '4.4%'}}></div>
                    <div className="bg-red-500" style={{width: '1.5%'}}></div>
                  </div>
                  <div className={`flex justify-between text-[9px] font-bold uppercase ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>{lang === 'it' ? 'Positivi' : 'Positive'}: 94.1%</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'future' && (
          <>
            {renderCard(t.cards.skills, <Monitor />, (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsData} margin={{ bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#374151' : '#f0f0f0'} />
                    <XAxis dataKey="name" tick={{fontSize: 9, fill: darkMode ? '#9ca3af' : '#6b7280'}} angle={-45} textAnchor="end" height={50} stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                    <YAxis unit="%" stroke={darkMode ? '#9ca3af' : '#6b7280'} tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1f2937' : '#fff', 
                        borderColor: darkMode ? '#374151' : '#e5e7eb'
                      }}
                      itemStyle={{ color: darkMode ? '#10b981' : '#059669' }}
                      labelStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                      cursor={{ fill: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}

            {renderCard(t.cards.prospects, <Briefcase />, (
              <div className="flex flex-col h-full">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 10, bottom: 10 }}>
                      <Pie
                        data={futureData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={65}
                        label={({name, value}) => `${name}: ${value}%`}
                        style={{ fontSize: '13px', fontWeight: 'bold' }}
                      >
                        {futureData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1f2937' : '#fff', 
                          borderColor: darkMode ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                        labelStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/*<div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200 mt-2 flex-1">
                  <h4 className="font-extrabold text-yellow-800 uppercase text-sm mb-4 tracking-widest border-b-2 border-yellow-200 pb-1.5">{t.stats.jobSeek}</h4>
                  <ul className="grid grid-cols-1 gap-3 text-sm text-yellow-900 font-bold">
                    <li className="flex justify-between items-center"><span>{lang === 'it' ? 'Guadagno' : 'Earnings'}</span> <span className="bg-yellow-200/50 px-2 py-0.5 rounded text-yellow-700">76.4%</span></li>
                    <li className="flex justify-between items-center"><span>{lang === 'it' ? 'Carriera' : 'Career'}</span> <span className="bg-yellow-200/50 px-2 py-0.5 rounded text-yellow-700">74.2%</span></li>
                    <li className="flex justify-between items-center"><span>{lang === 'it' ? 'Competenze' : 'Professional skills'}</span> <span className="bg-yellow-200/50 px-2 py-0.5 rounded text-yellow-700">73.2%</span></li>
                    <li className="flex justify-between items-center"><span>{lang === 'it' ? 'Stabilità' : 'Job security'}</span> <span className="bg-yellow-200/50 px-2 py-0.5 rounded text-yellow-700">67.7%</span></li>
                  </ul>
                </div> */}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 pb-10 text-center text-gray-400 text-[10px] uppercase tracking-widest border-t pt-8">
        <p>
          © 2024 <a href={ALMALAUREA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 underline transition-colors decoration-blue-200 underline-offset-4">AlmaLaurea</a> 
          - {lang === 'it' ? 'Profilo dei Laureati in Informatica' : 'Computer Science Graduates Profile'}
        </p>
      </div>
    </div>
  );
};

export default App;