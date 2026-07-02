import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { User } from '@/hooks/use-auth';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: User;
  onLogout: () => void;
}

const SELLER_STATS = [
  { label: 'Выручка за месяц', value: '4.86 млн ₽', trend: '+18%', icon: 'TrendingUp' },
  { label: 'Продано', value: '37', trend: '+6', icon: 'PackageCheck' },
  { label: 'Объявлений', value: '124', trend: '+9', icon: 'LayoutGrid' },
  { label: 'Конверсия', value: '4.7%', trend: '+0.8%', icon: 'Target' },
];
const CHART = [42, 58, 47, 71, 64, 88, 79, 96, 84, 100, 92, 76];

const BUYER_ORDERS = [
  { id: '#CN-4821', item: '40FT High Cube', status: 'В пути', date: '02.07' },
  { id: '#CN-4788', item: 'Reefer 40FT', status: 'Доставлен', date: '24.06' },
  { id: '#CN-4712', item: '20FT Dry', status: 'Оформление', date: '19.06' },
];

export default function CabinetModal({ open, onOpenChange, user, onLogout }: Props) {
  const isSeller = user.role === 'seller';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-h-[88vh] overflow-y-auto border-primary/20 sm:max-w-2xl">
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="font-display text-xl font-bold">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
          <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
            {isSeller ? 'Продавец' : 'Покупатель'}
          </Badge>
        </div>

        {isSeller ? (
          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {SELLER_STATS.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <Icon name={s.icon} size={18} className="text-primary" />
                    <span className="text-xs text-green-500">{s.trend}</span>
                  </div>
                  <div className="mt-2 font-display text-xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display font-bold uppercase">Аналитика продаж</h3>
                <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">12 мес</Badge>
              </div>
              <div className="flex h-32 items-end gap-1.5">
                {CHART.map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary/40 to-primary transition-all hover:from-accent hover:to-accent" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[['18', 'Покупок'], ['5.2 млн ₽', 'Потрачено'], ['7', 'В избранном']].map(([v, l]) => (
                <div key={l} className="glass rounded-2xl p-4 text-center">
                  <div className="font-display text-xl font-bold text-primary">{v}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="mb-3 font-display font-bold uppercase">История заказов</h3>
              <div className="space-y-2">
                {BUYER_ORDERS.map((o) => (
                  <div key={o.id} className="flex items-center justify-between rounded-xl border border-border/50 bg-background/40 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <Icon name="Package" size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{o.item}</div>
                        <div className="text-xs text-muted-foreground">{o.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-muted text-foreground hover:bg-muted">{o.status}</Badge>
                      <div className="mt-0.5 text-xs text-muted-foreground">{o.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            <Icon name="Settings" size={16} className="mr-2" /> Настройки
          </Button>
          <Button variant="destructive" className="flex-1" onClick={onLogout}>
            <Icon name="LogOut" size={16} className="mr-2" /> Выйти
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
