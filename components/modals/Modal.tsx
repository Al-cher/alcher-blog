import { X } from "lucide-react";
import { Button } from "../ui/button";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    return (
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}    
    `}
      >
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-accent/20 backdrop-blur-3xl backdrop-saturate-50 transition-all duration-700
        ${isOpen ? 'opacity-100' : 'opacity-0'}            
            `}
        />
        <div
          className={`relative z-10 w-full max-w-md rounded-2xl bg-background/60 px-6 py-12 shadow-xl transform transition-all duration-700
      ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        >
          <Button
            aria-label='Закрыть модальное окно'
            variant='ghost'
            className='top-4 right-4 absolute text-foreground/50 hover:text-foreground/70 transition-colors duration-300'
            onClick={onClose}
          >
            <X />
          </Button>

          {children}
        </div>
      </div>
    );
}