import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import type { User } from '@/hooks/use-auth';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAuth: (u: User) => void;
}

export default function AuthModal({ open, onOpenChange, onAuth }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onAuth({ name: name || email.split('@')[0], email, role });
    onOpenChange(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong overflow-hidden border-primary/20 sm:max-w-md">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold uppercase tracking-tight">
            {mode === 'login' ? (
              <>Вход в <span className="text-gradient">CONTNR</span></>
            ) : (
              <>Регистрация в <span className="text-gradient">CONTNR</span></>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-2 grid grid-cols-2 gap-2">
          {(['buyer', 'seller'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                role === r
                  ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'border-border text-muted-foreground hover:border-primary/40'
              }`}
            >
              <Icon name={r === 'buyer' ? 'ShoppingCart' : 'Store'} size={16} />
              {r === 'buyer' ? 'Покупатель' : 'Продавец'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === 'register' && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван Петров" />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mail.ru" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full font-display font-semibold uppercase tracking-wide">
            {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="font-semibold text-primary hover:underline"
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
