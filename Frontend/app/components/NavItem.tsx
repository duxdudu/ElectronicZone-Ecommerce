import { ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';

interface NavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}

export function NavItem({ icon, label, active = false, hasDropdown = false }: NavItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer ${active ? 'bg-orange-50 text-orange-500 font-medium' : ''}`}
    >
      <div>{icon}</div>
      <span className="font-medium">{label}</span>
      {hasDropdown && <ChevronDown size={16} className="ml-auto" />}
    </div>
  );
}