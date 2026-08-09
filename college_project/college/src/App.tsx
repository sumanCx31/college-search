import { useState } from 'react';
import { BookOpen, GraduationCap, Building2 } from 'lucide-react';
import { Hero } from './component/hero';

const faculties = [
  { id: 1, name: 'Engineering', desc: 'Cutting-edge innovation.', icon: <Building2 />, colleges: ['Institute of Tech', 'Robotics Lab'] },
  { id: 2, name: 'Medicine', desc: 'Healing through science.', icon: <GraduationCap />, colleges: ['General Hospital', 'Bio-Research'] },
  { id: 3, name: 'Business', desc: 'Strategy & Leadership.', icon: <BookOpen />, colleges: ['Global Business School', 'Finance Center'] },
  { id: 4, name: 'Arts', desc: 'Creative expression.', icon: <Building2 />, colleges: ['Design Academy', 'Performing Arts'] },
  { id: 5, name: 'Science', desc: 'Universe exploration.', icon: <GraduationCap />, colleges: ['Physics Institute', 'Chemistry Hub'] },
  { id: 6, name: 'Law', desc: 'Justice & Ethics.', icon: <BookOpen />, colleges: ['Courtroom Studies', 'Legal Clinic'] },
];

export default function Home() {
  const [selected, setSelected] = useState<typeof faculties[0] | null>(null);

  return (
    <>
   <Hero />
    </>
  );
}