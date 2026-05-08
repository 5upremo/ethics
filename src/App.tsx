/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  Users, 
  Globe, 
  Zap, 
  BookOpenText,
  Clock, 
  Waves,
  Database, 
  ShieldAlert, 
  Smartphone, 
  Monitor,
  Shield,
  Eye,
  Trash2,
  Drum,
  AlertTriangle,
  Mail,
  History,
  Cloud,
  Layers,
  ArrowRight
} from 'lucide-react';

// --- Types ---

interface Slide {
  id: string;
  type: 'title' | 'goals' | 'intro' | 'activity' | 'definitions' | 'timeline' | 'features' | 'grid' | 'references' | 'chart' | 'hotspot';
  title: string;
  content: any;
}

// --- Data ---

const slides: Slide[] = [
  {
    id: 'title',
    type: 'title',
    title: 'Advantage and Disadvantage of technology in Communication and Business',
    content: {
      lesson: 'Lesson 2',
      subtitle: 'Information Technology in Society',
      author: 'Author: Amzel E. Meñoza, LPT.',
      presentedBy: 'Presented by: BSIT1B - GROUP 4',
      bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
    }
  },
  {
    id: 'it-impact-chart',
    type: 'chart',
    title: 'Business Process Transformation',
    content: {
      type: 'bar',
      data: [
        { name: 'Cycle Time (Before)', value: 50, fill: '#64748b' },
        { name: 'Cycle Time (After)', value: 10, fill: '#6366f1' },
        { name: 'Insurance Proc (Days)', value: 30, fill: '#8b5cf6' },
        { name: 'Insurance Proc (1 Day)', value: 1, fill: '#a855f7' }
      ],
      description: 'IT enables a reduction of cycle time from 50 days down to 10. Insurance processing drops from one month to just one day.'
    }
  },
  {
    id: 'objectives',
    type: 'goals',
    title: 'Module Objectives',
    content: [
      {
        icon: Monitor,
        text: 'Discuss the uses of IT in business operations.'
      },
      {
        icon: Zap,
        text: 'Recognize the advantages of technology in Communication and Business.'
      },
      {
        icon: ShieldAlert,
        text: 'Discuss the Disadvantages in Technology in Communication and Business.'
      },
      {
        icon: Eye,
        text: 'Identify the negative effects of workplace surveillance.'
      }
    ]
  },
  {
    id: 'intro',
    type: 'intro',
    title: 'Introduction to Interdependence',
    content: {
      text: "Producers as sellers and customers as purchasers are interdependent; without them, the firm would not exist. Manufacturers sell items in a market, and customers go to the market for necessities.",
      stats: [
        { label: 'Producers', value: 'Sellers' },
        { label: 'Consumers', value: 'Purchasers' },
        { label: 'Nexus', value: 'Market' }
      ]
    }
  },
  {
    id: 'abstraction',
    type: 'intro',
    title: 'The Digital Transformation',
    content: {
      text: "Over the last 10 years, we have witnessed a fundamental transformation in how organizations interact with customers. The explosion of Internet and mobile technology is outstripping long-established working arrangements.",
      stats: [
        { label: 'Timeline', value: '10 Years' },
        { label: 'Drivers', value: 'Mobile' },
        { label: 'Reach', value: 'Limitless' }
      ]
    }
  },
  {
    id: 'history',
    type: 'timeline',
    title: 'History of Communication',
    content: [
      { 
        year: 'Pre-Language', 
        text: 'Primitive: Communicated through sounds and body language.', 
        icon: Users,
        image: 'https://s3.us-east-2.wasabisys.com/media-oaj/wp-content/uploads/2013/09/02154228/gesturesoftheorator.jpg'
        
      },
      { 
        year: 'Cave Art', 
        text: 'Storytelling: Paintings used to tell stories on dust and caves.', 
        icon: BookOpenText,
        image: 'https://i.redd.it/e62u5iswaqva1.png'
      },
      { 
        year: 'Smoke Signals', 
        text: 'Visual: Used smoke signals for long-distance warnings.', 
        icon: Waves,
        image: 'https://scontent-nrt6-1.xx.fbcdn.net/v/t39.30808-6/569555877_26892245100376162_8683846371735889339_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e06c5d&_nc_eui2=AeGT-TJtjpztC1Z5HaW0aM31glIU4RteT-uCUhThG15P6xU1IZpTf383JspRKjvz6anNW6Zr5yLLZ-VUl4ZjYBMB&_nc_ohc=ufhgATsNIoAQ7kNvwEmD8vd&_nc_oc=AdqoQVvkbY_eyr7HBAdN394v8pcVj8FwFZxPc5i5n0ywfidIZs1qkjQyPvpbyIjjGIQ&_nc_zt=23&_nc_ht=scontent-nrt6-1.xx&_nc_gid=_UiBBfP2yGJJaFeRtdOCHA&_nc_ss=7b2a8&oh=00_Af5c756tShNrKV92OYjRtvJKzYM9zttGtHBttasbbHGF0w&oe=6A0203D5'
      },
      { 
        year: 'Talking Drums', 
        text: 'Rhythm: Communication across distances using drum patterns.', 
        icon: Drum,
        image: 'https://www.systems2win.com/images/cartoons/taktTimeDrummer.png'
      },
      { 
        year: '30,000 BC', 
        text: 'Symbols: Development of Totem poles and Hieroglyphics.', 
        icon: Globe,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI1YoP2PykP_hzHADjcx3t1yKpwHmbw1NftB7lITPEuTuPxBvC'
      },
      { 
        year: '900 BC', 
        text: 'Postal: Chinese develop postal system to deliver written messages.', 
        icon: Mail,
        image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1xmrMnVM22ffNKNe_mR0GgVAg-U0YxpUu4hjcQHLYFFV-9cHCm_LlRY0UwWAkNG8C3GKXA-bHbsRgtbgETZ2sfFgoGGISDXux3Asge2weNwh1U0Avhq5hHeidCFep_Tic_budCiysaL8/s1600/China+mail.jpg'
      },
      { 
        year: '776 BC', 
        text: 'Pigeons: Homing pigeons carry results for Olympic Games.', 
        icon: Eye,
        image: 'https://i.etsystatic.com/8746818/r/il/7b1726/927932618/il_fullxfull.927932618_e2xc.jpg'
      }
    ]
  },
  {
    id: 'comm-advantages',
    type: 'grid',
    title: 'Advantages: Communication',
    content: [
      { icon: Globe, title: 'Global Contact', text: 'Helps us to communicate easily with others worldwide.' },
      { icon: Zap, title: 'Better Living', text: 'Aims for a higher standard of living through connectivity.' },
      { icon: Database, title: 'Gather Info', text: 'Vast resources to quickly gather necessary information.' },
      { icon: Cloud, title: 'Gov Services', text: 'Create programs for private and non-private Government sectors.' },
      { icon: Smartphone, title: 'Entertainment', text: 'Immediate download of files, music, games, and movies.' },
      { icon: Target, title: 'Education', text: 'Significant improvements in teaching and learning processes.' },
      { icon: Globe, title: 'E-Shopping', text: 'Conveniently buy items through the web (online shopping).' },
      { icon: History, title: 'Updates', text: 'Stay updated through social happenings in real-time.' },
      { icon: Users, title: 'Expression', text: 'State opinions through blogs, twitter, and social platforms.' }
    ]
  },
  {
    id: 'comm-disadvantages',
    type: 'grid',
    title: 'Disadvantages: Communication',
    content: [
      { icon: Clock, title: 'Addiction', text: 'Users becoming compulsively addicted to computers.' },
      { icon: ShieldAlert, title: 'Wasted Money', text: 'Wasting of money to buy unnecessary things.' },
      { icon: AlertTriangle, title: 'Wasted Time', text: 'Wasting of time to search or watch non-sense things.' },
      { icon: Eye, title: 'Poor Eyesight', text: 'Exhaustive screen time leading to poor eyesight.' },
      { icon: Trash2, title: 'Plagiarism', text: 'Easier copying and spreading of intellectual work.' },
      { icon: Users, title: 'Neglect', text: 'Avoiding the daily house chores and responsibilities.' },
      { icon: Shield, title: 'Privacy', text: 'Issues regarding privacy as a major problem.' },
      { icon: ShieldAlert, title: 'Cybercrime', text: 'Significant increase in hacking and online scams.' },
      { icon: AlertTriangle, title: 'Reputation', text: 'Destruction of one’s reputation and relationships.' },
      { icon: Shield, title: 'Viruses', text: 'Rapid spreading of malicious software and viruses.' }
    ]
  },
  {
    id: 'business-advantages',
    type: 'features',
    title: 'IT Advantages in Business',
    content: [
      { 
        title: 'Globalization', 
        icon: Globe, 
        text: 'Fostering Economic and Social exchange on a worldwide scale.' 
      },
      { 
        title: 'Competitive Edge', 
        icon: Zap, 
        text: 'Using Enterprise Resource Planning (ERP) for competitive advantages.' 
      },
      { 
        title: 'Management Shift', 
        icon: Layers, 
        text: 'Using technology to change the nature of the management process.' 
      },
      { 
        title: 'Information Systems', 
        icon: Database, 
        text: 'Using Information Systems (IS) as a core competitive advantage.' 
      },
      { 
        title: 'Decision Making', 
        icon: Target, 
        text: 'Providing Management Information Systems (MIS) for critical reports.' 
      },
      { 
        title: 'Knowledge IS', 
        icon: Smartphone, 
        text: 'Supporting Knowledge Info Systems (KIS) to create and store knowledge.' 
      },
      { 
        title: 'Corporate Storage', 
        icon: Database, 
        text: 'Securely storing corporate data in Excel, Cloud, and Accounting tools.' 
      },
      { 
        title: 'Operational Ease', 
        icon: Globe, 
        text: 'Increased operational flexibility for both local and global growth.' 
      }
    ]
  },
  {
    id: 'business-disadvantages',
    type: 'grid',
    title: 'IT Disadvantages in Business',
    content: [
      { icon: ShieldAlert, title: 'Expense', text: 'High costs for Implementation, Maintenance, and Training.' },
      { icon: Eye, title: 'Privacy Issues', text: 'Organizations struggling with issues regarding stored privacy.' },
      { icon: Shield, title: 'Security Risks', text: 'Increased risk of security breaches and unauthorized access.' },
      { icon: Users, title: 'Identity Theft', text: 'Vulnerability to Identity Theft (Phishing and Pharming).' },
      { icon: Clock, title: 'Dependence', text: 'Over-reliance on technology leading to lack of basic skills.' },
      { icon: Users, title: 'Unemployment', text: 'Rapid increase due to computers performing work faster.' },
      { icon: ShieldAlert, title: 'Spyware', text: 'Programs monitoring activities and stealing corporate data.' },
      { icon: Globe, title: 'Weaponry', text: 'Technology being used in world destruction weapons and war.' },
      { icon: AlertTriangle, title: 'Distraction', text: 'Humans are easily distracted by social media and games.' },
      { icon: Eye, title: 'Health Concerns', text: 'Vision problems, obesity, insomnia, and loss of sleep.' }
    ]
  },
  {
    id: 'surveillance',
    type: 'features',
    title: 'Workplace Surveillance',
    content: [
      { 
        title: 'Negative Impact', 
        icon: ShieldAlert, 
        text: 'Constant monitoring can lead to high levels of stress and anxiety for employees.' 
      },
      { 
        title: 'Privacy Loss', 
        icon: Eye, 
        text: 'Surveillance can be seen as an invasion of personal privacy in the professional setting.' 
      },
      { 
        title: 'Trust Breach', 
        icon: Users, 
        text: 'Erodes the trust between management and staff, leading to lower morale.' 
      }
    ]
  },
  {
    id: 'activity',
    type: 'activity',
    title: 'Self Reflect Activity',
    content: [
      { 
        q: 'How does IT transform business processes?', 
        a: 'By reducing cycle times (e.g., from 50 days to 10) and increasing operational efficiency through automation.' 
      },
      { 
        q: 'What are the main security risks in modern business?', 
        a: 'Identity theft, phishing, spyware, and unauthorized access to corporate data.' 
      },
      { 
        q: 'How does technology impact workplace stress?', 
        a: 'Workplace surveillance and constant monitoring can lead to high levels of stress and anxiety for employees.' 
      }
    ]
  },
  {
    id: 'references',
    type: 'references',
    title: 'References',
    content: [
      'Mgunda, M. I. (2019). The Impacts Information Technology On Business. Journal of International Conference Proceedings, 2(3), 149–156.',
      'Gunasekaran, A., & Nath, B. (1997). The role of information technology in business process reengineering.',
      'Nikoloski, Krume (2014). Role of IT in Business.',
      'International Journal Of Science And Research (IJSR). (n.d.). The Role of IT in the Business Sector.'
    ]
  }
];

// --- Components ---

const SlideTitle = ({ slide }: { slide: Slide }) => (
  <div className="relative flex flex-col items-center justify-center h-full text-center p-6 md:p-8 overflow-y-auto bg-slate-900">
    <motion.div 
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.4 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 z-0"
    >
      <img 
        src={slide.content.bgImage}
        alt="Background"
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </motion.div>
    
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-indigo-900/40 to-black/90 z-10"></div>

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-20 space-y-10 max-w-5xl"
    >
      <div className="flex flex-col items-center gap-6">
        <span className="bg-indigo-600 px-6 py-2 rounded-full text-xs font-black text-white uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20">
          {slide.content.lesson}
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] font-display drop-shadow-2xl">
          {slide.title}
        </h1>
      </div>
      
      <div className="space-y-4">
        <p className="text-lg md:text-3xl text-indigo-100 font-bold max-w-2xl mx-auto opacity-90 drop-shadow-lg italic">
          {slide.content.subtitle}
        </p>
        <div className="flex flex-col items-center gap-2 pt-4">
          <div className="flex items-center justify-center gap-4 text-white/60 font-black text-sm uppercase tracking-widest">
            <div className="h-px w-8 bg-white/20" />
            {slide.content.author}
            <div className="h-px w-8 bg-white/20" />
          </div>
          {slide.content.presentedBy && (
            <div className="text-white/40 font-black text-xs uppercase tracking-[0.3em]">
              {slide.content.presentedBy}
            </div>
          )}
        </div>
      </div>

      <div className="pt-12">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="w-16 h-1.5 bg-indigo-500 mx-auto rounded-full shadow-lg shadow-indigo-500/50" 
        />
      </div>
    </motion.div>
  </div>
);

const SlideGoals = ({ slide }: { slide: Slide }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 h-full bg-slate-50 overflow-y-auto">
    <div className="md:col-span-4 flex flex-col justify-center p-8 md:p-12 bg-indigo-600 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 font-display relative z-10"
      >
        {slide.title}
      </motion.h2>
      <div className="w-16 h-1.5 bg-white rounded-full relative z-10" />
    </div>
    <div className="md:col-span-8 flex flex-col justify-center p-6 md:p-24 gap-4 md:gap-8 bg-white">
      {slide.content.map((item: any, idx: number) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-center gap-4 md:gap-8 p-4 md:p-8 rounded-2xl md:rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all shadow-sm shadow-indigo-100/20"
        >
          <div className="p-3 md:p-5 bg-indigo-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-indigo-100">
            <item.icon className="w-5 h-5 md:w-8 md:h-8" />
          </div>
          <p className="text-lg md:text-2xl text-slate-700 font-bold leading-snug tracking-tight">
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
);

const SlideIntro = ({ slide }: { slide: Slide }) => (
  <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
    <div className="flex-1 flex flex-col justify-center px-8 md:px-24 py-12 md:py-0">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs mb-6"
      >
        {slide.title}
      </motion.h2>
      <p className="text-2xl md:text-6xl text-slate-900 font-bold leading-[1.1] max-w-5xl tracking-tight font-display mb-12">
        {slide.content.text}
      </p>
      <div className="w-24 h-1.5 bg-indigo-600 rounded-full" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 bg-white border-t border-slate-200">
      {slide.content.stats.map((stat: any, idx: number) => (
        <div key={idx} className="p-8 md:p-16 border-b md:border-b-0 md:border-r last:border-0 border-slate-100 flex flex-col items-center">
          <span className="text-indigo-600 font-black text-3xl md:text-5xl mb-2 font-display">{stat.value}</span>
          <span className="text-slate-400 uppercase tracking-[0.2em] text-[10px] font-black">{stat.label}</span>
        </div>
      ))}
    </div>
  </div>
);

const SlideTimeline = ({ slide }: { slide: Slide }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-full flex flex-col p-6 md:p-16 bg-white overflow-y-auto pb-32 md:pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-display tracking-tight">{slide.title}</h2>
        <span className="text-[10px] md:text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full uppercase tracking-widest">Historical Evolution Gallery</span>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:grid-cols-2 lg:gap-12 items-start md:items-center">
        {/* Gallery Image Display */}
        <div className="relative aspect-[3/4] md:aspect-[4/5] max-h-[50vh] md:max-h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={slide.content[activeIndex].image}
              alt="Historical reference"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-contain p-4"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
            <h4 className="text-2xl font-black text-slate-900 mb-1">{slide.content[activeIndex].year}</h4>
            <p className="text-slate-600 font-medium">{slide.content[activeIndex].text.split(':')[1]}</p>
          </div>
        </div>

        {/* Timeline Selectors */}
        <div className="space-y-4">
          {slide.content.map((item: any, idx: number) => (
            <motion.button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-full text-left p-6 rounded-2xl flex items-center gap-6 transition-all border-2 ${
                activeIndex === idx 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-slate-50 border-transparent hover:border-slate-200 text-slate-500'
              }`}
            >
              <div className={`p-3 rounded-xl ${activeIndex === idx ? 'bg-white/20' : 'bg-slate-200 text-slate-600'}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <div className={`text-xs font-black uppercase tracking-widest mb-1 ${activeIndex === idx ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {item.year}
                </div>
                <div className={`text-xl font-bold ${activeIndex === idx ? 'text-white' : 'text-slate-900'}`}>
                  {item.text.split(':')[0]}
                </div >
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SlideChart = ({ slide }: { slide: Slide }) => (
  <div className="h-full flex flex-col p-6 md:p-16 bg-white overflow-y-auto pb-32 md:pb-16">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-display tracking-tight mb-6 md:mb-0">{slide.title}</h2>
      <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
        {slide.content.description}
      </p>
    </div>

    <div className="flex-1 min-h-[300px] md:min-h-0 bg-white p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-slate-100">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={slide.content.data} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            dy={20}
            angle={-15}
            textAnchor="end"
          />
          <YAxis hide />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-60">{payload[0].payload.name}</p>
                    <p className="text-2xl font-black">{payload[0].value}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="value" 
            radius={[20, 20, 20, 20]} 
            barSize={60}
          >
            {slide.content.data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const SlideGrid = ({ slide }: { slide: Slide }) => (
  <div className="h-full bg-slate-50 p-6 md:p-16 overflow-y-auto pb-32 md:pb-16">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-slate-200 pb-8 md:pb-10 gap-4">
      <div>
        <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Detailed Analysis</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-display">{slide.title}</h2>
      </div>
      <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-0">
        <span className="text-indigo-600 text-3xl md:text-4xl font-black font-display">{slide.content.length}</span>
        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Core Factors</span>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {slide.content.map((item: any, idx: number) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-100/40 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 md:w-24 h-20 md:h-24 bg-indigo-50 rounded-bl-[3rem] md:rounded-bl-[4rem] transition-all group-hover:bg-indigo-600" />
          
          <div className="p-3 md:p-4 bg-white shadow-lg shadow-indigo-100 rounded-xl md:rounded-2xl w-fit mb-6 md:mb-8 relative z-10 group-hover:scale-110 transition-transform">
            <item.icon className="w-6 md:w-8 h-6 md:h-8 text-indigo-600" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight relative z-10 font-display uppercase group-hover:text-indigo-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed relative z-10 group-hover:text-slate-600">
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
);

const SlideFeatures = ({ slide }: { slide: Slide }) => (
  <div className="h-full bg-slate-50 p-6 md:p-24 overflow-y-auto pb-32 md:pb-24">
    <div className="mb-12 md:mb-16">
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-display tracking-tight mb-4">{slide.title}</h2>
      <div className="w-20 h-2 bg-indigo-600 rounded-full" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {slide.content.map((item: any, idx: number) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-start gap-6 md:gap-8 shadow-sm hover:translate-y-[-4px] transition-transform"
        >
          <div className="p-4 md:p-6 bg-indigo-600 text-white rounded-2xl md:rounded-3xl shadow-lg shadow-indigo-200">
            <item.icon className="w-6 h-6 md:w-10 md:h-10" />
          </div>
          <div className="space-y-2 md:space-y-4 pt-2">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display italic">{item.title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed text-base md:text-lg italic opacity-80">
              {item.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const SlideActivity = ({ slide }: { slide: Slide }) => {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggleReveal = (idx: number) => {
    if (revealed.includes(idx)) {
      setRevealed(revealed.filter(i => i !== idx));
    } else {
      setRevealed([...revealed, idx]);
    }
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 bg-slate-50 overflow-y-auto">
      <div className="p-8 md:p-24 flex flex-col justify-center bg-slate-900 text-white relative">
        <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Interactive Activity</span>
        <h2 className="text-4xl md:text-6xl font-black mb-8 md:mb-12 tracking-tighter uppercase italic leading-none font-display">
          {slide.title}
        </h2>

      </div>
      
      <div className="p-6 md:p-24 flex flex-col justify-center gap-6 md:gap-8 bg-white pb-32 md:pb-24">
        {slide.content.map((item: any, idx: number) => (
          <motion.div 
            key={idx}
            onClick={() => toggleReveal(idx)}
            className={`cursor-pointer p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border transition-all duration-300 ${
              revealed.includes(idx) 
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200 translate-y-[-4px]' 
              : 'bg-slate-50 border-slate-100 text-slate-900 hover:border-indigo-200'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-black rounded-xl md:rounded-2xl shadow-lg ${
                revealed.includes(idx) ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white shadow-indigo-100'
              }`}>
                {idx + 1}
              </span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase font-display italic">{item.q}</h3>
            </div>
            
            <AnimatePresence>
              {revealed.includes(idx) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-lg font-medium leading-relaxed pt-4 border-t border-white/20 mt-4 italic text-indigo-50">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {!revealed.includes(idx) && (
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-4 flex items-center gap-2">
                Click to reveal answer <div className="w-4 h-px bg-slate-300" />
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SlideReferences = ({ slide, onReturn }: { slide: Slide; onReturn: () => void }) => (
  <div className="h-full flex flex-col p-6 md:p-24 bg-white overflow-y-auto pb-32 md:pb-24">
    <div className="flex items-center gap-4 mb-8 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight">{slide.title}</h2>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
    
    <div className="space-y-6 md:space-y-8 max-w-4xl">
      {slide.content.map((item: string, idx: number) => (
        <motion.p 
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="text-lg md:text-xl text-slate-500 leading-relaxed font-bold italic pl-6 md:pl-8 border-l-4 border-indigo-100 hover:border-indigo-600 transition-colors"
        >
          {item}
        </motion.p>
      ))}
    </div>
    
    <div className="mt-12 md:mt-auto pt-16 flex justify-end items-center">
      <button 
        onClick={onReturn}
        className="group flex flex-col md:flex-row items-center gap-4 text-slate-900 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] py-3 md:py-4 px-6 md:px-8 bg-slate-50 rounded-2xl md:rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-sm"
      >
        Return to Module <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    const nextIdx = currentSlide + newDirection;
    if (nextIdx >= 0 && nextIdx < slides.length) {
      setDirection(newDirection);
      setCurrentSlide(nextIdx);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [paginate]);

  const slideData = slides[currentSlide];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <main className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0"
          >
            {slideData.type === 'title' && <SlideTitle slide={slideData} />}
            {slideData.type === 'goals' && <SlideGoals slide={slideData} />}
            {slideData.type === 'intro' && <SlideIntro slide={slideData} />}
            {slideData.type === 'timeline' && <SlideTimeline slide={slideData} />}
            {slideData.type === 'chart' && <SlideChart slide={slideData} />}
            {slideData.type === 'grid' && <SlideGrid slide={slideData} />}
            {slideData.type === 'features' && <SlideFeatures slide={slideData} />}
            {slideData.type === 'activity' && <SlideActivity slide={slideData} />}
            {slideData.type === 'references' && <SlideReferences slide={slideData} onReturn={() => setCurrentSlide(0)} />}
          </motion.div>
        </AnimatePresence>

        {/* Global Progress Bar (from sleek theme) */}
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-200 z-50">
          <motion.div 
            className="h-full bg-indigo-600 rounded-r-full shadow-lg shadow-indigo-200"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </div>

        {/* Footer Navigation Controls (from sleek theme) */}
        <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 flex items-center gap-4 md:gap-6 z-50">
          <div className="hidden sm:flex flex-col items-end gap-1 px-4 py-2 border-r border-slate-200">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Navigation</div>
            <div className="text-xs font-black text-slate-900">
              SLIDE <span className="text-indigo-600">{currentSlide + 1 < 10 ? `0${currentSlide + 1}` : currentSlide + 1}</span> / {slides.length}
            </div>
          </div>
          
          <div className="flex gap-2 md:gap-4">
            <button 
              onClick={() => paginate(-1)}
              disabled={currentSlide === 0}
              className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md shadow-xl rounded-full border border-slate-200 flex items-center justify-center text-slate-800 disabled:opacity-20 hover:bg-slate-50 transition-all active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <button 
              onClick={() => paginate(1)}
              disabled={currentSlide === slides.length - 1}
              className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 shadow-2xl shadow-slate-300 rounded-full flex items-center justify-center text-white disabled:opacity-20 hover:bg-indigo-600 transition-all active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Key Hints Overlay */}
        <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] pointer-events-none opacity-50">
          Space / Arrows To Scroll
        </div>
      </main>
    </div>
  );
}
