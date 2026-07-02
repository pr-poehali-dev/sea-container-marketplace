import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import useTheme from '@/hooks/use-theme';
import useAuth from '@/hooks/use-auth';
import AuthModal from '@/components/AuthModal';
import CabinetModal from '@/components/CabinetModal';

const NAV = [
  { label: 'Каталог', id: 'catalog' },
  { label: 'Услуги', id: 'services' },
  { label: 'Сервис', id: 'service' },
  { label: 'О компании', id: 'about' },
  { label: 'Новости', id: 'news' },
  { label: 'Контакты', id: 'contacts' },
];

const TICKER = [
  '10FT · от 95 000 ₽',
  '20FT DRY · от 145 000 ₽',
  '40FT HC · от 280 000 ₽',
  '45FT · от 340 000 ₽',
  'REEFER 40 · от 690 000 ₽',
  'SPECIAL · от 210 000 ₽',
];

const CATALOG = [
  { title: 'Контейнеры 10 футов', desc: 'Компактные, для хранения и перевозки', price: 'от 95 000 ₽', icon: 'Box', tag: '10FT' },
  { title: 'Контейнеры 20 футов', desc: 'Универсальный стандарт Dry Cube', price: 'от 145 000 ₽', icon: 'Container', tag: '20FT' },
  { title: 'Контейнеры 40 футов', desc: 'Максимальный объём High Cube', price: 'от 280 000 ₽', icon: 'Container', tag: '40FT' },
  { title: 'Контейнеры 45 футов', desc: 'Увеличенная вместимость', price: 'от 340 000 ₽', icon: 'Container', tag: '45FT' },
  { title: 'Рефрижераторные', desc: 'С поддержкой температуры Reefer', price: 'от 690 000 ₽', icon: 'Snowflake', tag: 'REF' },
  { title: 'Специальные', desc: 'Open Top, Flat Rack, Tank', price: 'от 210 000 ₽', icon: 'PackageOpen', tag: 'SPEC' },
];

const SERVICES = [
  { icon: 'Globe', title: 'Международная аренда', desc: 'Аренда контейнеров по всему миру' },
  { icon: 'HandCoins', title: 'Выкуп контейнеров', desc: 'Быстрый выкуп по рыночной цене' },
  { icon: 'ShoppingBag', title: 'Продажа контейнеров', desc: 'Новые и б/у от терминалов' },
  { icon: 'Wrench', title: 'Ремонт и переоборудование', desc: 'Модификация под ваши задачи' },
  { icon: 'Warehouse', title: 'Аренда и хранение', desc: 'Безопасное хранение на терминалах' },
  { icon: 'Radiation', title: 'Проверка на радиацию', desc: 'Дозиметрический контроль' },
  { icon: 'Anchor', title: 'Морской регистр', desc: 'Сертификация CSC и регистр' },
  { icon: 'Home', title: 'Дома из контейнеров', desc: 'Бытовки и модульные дома' },
];

const SERVICE_SUB = [
  { icon: 'CreditCard', title: 'Подписка и тарифы' },
  { icon: 'FileCheck', title: 'Сопровождение сделки' },
  { icon: 'UserCog', title: 'Персональный менеджер' },
  { icon: 'Landmark', title: 'Лизинг / Рассрочка' },
  { icon: 'ScrollText', title: 'Таможенное оформление' },
  { icon: 'Truck', title: 'Логистика' },
  { icon: 'Ship', title: 'ВЭД' },
  { icon: 'BadgePercent', title: 'Факторинг' },
];

const NEWS = [
  { date: '28 июня 2026', title: 'Скидки до 15% на партии 40FT High Cube', tag: 'Акция' },
  { date: '20 июня 2026', title: 'Новый терминал во Владивостоке', tag: 'Новости' },
  { date: '12 июня 2026', title: 'Запуск услуги лизинга контейнеров', tag: 'Сервис' },
];

const STEPS = [
  { icon: 'Search', title: 'Выберите', desc: 'Подберите контейнер в каталоге' },
  { icon: 'FileSignature', title: 'Оформите', desc: 'Сопровождение сделки под ключ' },
  { icon: 'Truck', title: 'Получите', desc: 'Доставка до вашего адреса' },
];

export default function Index() {
  const { theme, toggle } = useTheme();
  const { user, login, logout } = useAuth();
  const { toast } = useToast();
  const [authOpen, setAuthOpen] = useState(false);
  const [cabinetOpen, setCabinetOpen] = useState(false);

  const openCabinet = () => (user ? setCabinetOpen(true) : setAuthOpen(true));

  const notify = (title: string) =>
    toast({ title, description: 'Раздел в разработке — скоро здесь появится контент.' });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* animated blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animate-blob absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-blob absolute right-0 top-1/3 h-80 w-80 rounded-full bg-accent/20 blur-3xl" style={{ animationDelay: '3s' }} />
        <div className="animate-blob absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative z-10">
        {/* NAV */}
        <header className="sticky top-0 z-50 glass-strong">
          <div className="container flex h-16 items-center justify-between">
            <a href="#top" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                <Icon name="Container" size={20} />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                CONT<span className="text-gradient">NR</span>
              </span>
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                aria-label="Тема"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={18} />
              </button>
              {!user && (
                <Button variant="ghost" size="sm" onClick={() => setAuthOpen(true)} className="hidden sm:flex">
                  <Icon name="LogIn" size={16} className="mr-1.5" /> Войти
                </Button>
              )}
              <Button size="sm" onClick={openCabinet} className="rounded-xl font-display font-semibold uppercase tracking-wide">
                {user ? user.name.split(' ')[0] : 'Кабинет'}
              </Button>
            </div>
          </div>
        </header>

        {/* TICKER */}
        <div className="overflow-hidden glass border-y border-border/50 py-2">
          <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="text-xs font-medium text-muted-foreground">
                <span className="mr-2 text-primary">◆</span>{t}
              </span>
            ))}
          </div>
        </div>

        {/* HERO */}
        <section id="top" className="relative aurora">
          <div className="container py-24 text-center md:py-32">
            <Badge className="mb-6 animate-fade-up rounded-full bg-primary/15 px-4 py-1.5 text-primary hover:bg-primary/15">
              Маркетплейс морских контейнеров №1
            </Badge>
            <h1 className="animate-fade-up font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
              Контейнеры
              <br />
              <span className="animate-gradient bg-gradient-to-r from-primary via-fuchsia-500 to-accent bg-clip-text text-transparent">
                по лучшей цене
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg text-muted-foreground">
              Покупка, продажа, аренда и доставка морских контейнеров по России и СНГ.
              Прозрачные цены, сопровождение сделки и логистика под ключ.
            </p>
            <div className="mx-auto mt-8 flex max-w-xl animate-fade-up flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Тип, город или терминал…" className="h-12 rounded-2xl glass pl-11 text-base" />
              </div>
              <Button size="lg" onClick={() => notify('Поиск по каталогу')} className="h-12 rounded-2xl font-display font-semibold uppercase tracking-wide">
                Найти <Icon name="ArrowRight" size={18} className="ml-1.5" />
              </Button>
            </div>
            <div className="mx-auto mt-12 flex max-w-2xl animate-fade-up justify-center gap-10">
              {[['16 400+', 'контейнеров'], ['48', 'терминалов'], ['4.9', 'рейтинг']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-4xl font-bold text-gradient">{v}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATALOG */}
        <section id="catalog" className="py-20">
          <div className="container">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Каталог</span>
              <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-gradient">Типы контейнеров</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CATALOG.map((c, i) => (
                <button
                  key={c.title}
                  onClick={() => notify(c.title)}
                  className="group glass rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                  style={{ animation: `fade-up 0.5s ${i * 0.06}s both` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-transform group-hover:scale-110">
                      <Icon name={c.icon} size={28} />
                    </div>
                    <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">{c.tag}</Badge>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-primary">{c.price}</span>
                    <Icon name="ArrowUpRight" size={20} className="text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="py-16">
          <div className="container">
            <div className="glass rounded-3xl p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-3">
                {STEPS.map((s, i) => (
                  <div key={s.title} className="relative text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25">
                      <Icon name={s.icon} size={28} />
                    </div>
                    <div className="mt-2 font-display text-sm font-bold text-primary">0{i + 1}</div>
                    <h3 className="font-display text-xl font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20">
          <div className="container">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Услуги</span>
              <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-gradient">Всё для контейнеров</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => notify(s.title)}
                  className="group glass rounded-2xl p-5 text-left transition-all hover:-translate-y-1 hover:border-primary/50"
                  style={{ animation: `fade-up 0.5s ${i * 0.05}s both` }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon name={s.icon} size={22} />
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE / SUBSCRIPTION */}
        <section id="service" className="py-20">
          <div className="container">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Сервис и подписка</span>
              <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-gradient">Сопровождение сделки</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICE_SUB.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => notify(s.title)}
                  className="glass flex items-center gap-3 rounded-2xl p-4 text-left transition-all hover:-translate-y-1 hover:border-primary/50"
                  style={{ animation: `fade-up 0.5s ${i * 0.04}s both` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon name={s.icon} size={20} />
                  </div>
                  <span className="font-semibold">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20">
          <div className="container">
            <div className="glass overflow-hidden rounded-3xl p-8 md:p-14">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">О компании</span>
                  <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-gradient">Надёжный партнёр</h2>
                  <p className="mt-4 text-muted-foreground">
                    CONTNR — маркетплейс морских контейнеров с прозрачными ценами и полным
                    сопровождением сделки. Мы объединяем терминалы и покупателей по всей России
                    и СНГ, обеспечивая честную цену, логистику и юридическую чистоту.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {[['10+ лет', 'на рынке'], ['5 000+', 'сделок'], ['48', 'терминалов'], ['24/7', 'поддержка']].map(([v, l]) => (
                      <div key={l} className="glass rounded-2xl p-4">
                        <div className="font-display text-2xl font-bold text-primary">{v}</div>
                        <div className="text-sm text-muted-foreground">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4">
                  {[
                    { icon: 'ShieldCheck', t: 'Проверенные продавцы', d: 'Инспекция и сертификация CSC' },
                    { icon: 'Wallet', t: 'Прозрачные цены', d: 'Без скрытых комиссий и наценок' },
                    { icon: 'Headphones', t: 'Персональный менеджер', d: 'Сопровождение на всех этапах' },
                  ].map((f) => (
                    <div key={f.t} className="glass flex items-center gap-4 rounded-2xl p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                        <Icon name={f.icon} size={24} />
                      </div>
                      <div>
                        <div className="font-display font-bold">{f.t}</div>
                        <div className="text-sm text-muted-foreground">{f.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEWS */}
        <section id="news" className="py-20">
          <div className="container">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Новости и акции</span>
              <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-gradient">Что нового</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {NEWS.map((n, i) => (
                <button
                  key={n.title}
                  onClick={() => notify(n.title)}
                  className="group glass rounded-3xl p-6 text-left transition-all hover:-translate-y-1.5 hover:border-primary/50"
                  style={{ animation: `fade-up 0.5s ${i * 0.06}s both` }}
                >
                  <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">{n.tag}</Badge>
                  <div className="mt-3 text-sm text-muted-foreground">{n.date}</div>
                  <h3 className="mt-1 font-display text-lg font-bold leading-snug">{n.title}</h3>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Читать <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container">
            <div className="aurora relative overflow-hidden rounded-3xl border border-primary/20 p-10 text-center md:p-16">
              <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
                Начните торговать <span className="text-gradient">контейнерами</span> сегодня
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Регистрация бесплатна. Разместите объявление или найдите контейнер за пару минут.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg" onClick={() => setAuthOpen(true)} className="h-12 rounded-2xl font-display font-semibold uppercase tracking-wide">
                  Стать продавцом
                </Button>
                <Button size="lg" variant="outline" onClick={() => setAuthOpen(true)} className="h-12 rounded-2xl border-primary/40 font-display font-semibold uppercase tracking-wide">
                  Купить контейнер
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contacts" className="glass border-t border-border/50 py-14">
          <div className="container grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                  <Icon name="Container" size={20} />
                </div>
                <span className="font-display text-xl font-bold">CONT<span className="text-gradient">NR</span></span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Маркетплейс морских контейнеров №1 в России и СНГ.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold uppercase">Каталог</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {CATALOG.slice(0, 5).map((c) => (
                  <li key={c.title}><button onClick={() => notify(c.title)} className="hover:text-primary">{c.title}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold uppercase">Юр. информация</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {['Пользовательское соглашение', 'Политика конфиденциальности', 'Договор оферта'].map((l) => (
                  <li key={l}><button onClick={() => notify(l)} className="text-left hover:text-primary">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold uppercase">Контакты</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Icon name="Phone" size={16} className="text-primary" /> 8 800 555-35-35</li>
                <li className="flex items-center gap-2"><Icon name="Mail" size={16} className="text-primary" /> hello@contnr.ru</li>
                <li className="flex items-center gap-2"><Icon name="MapPin" size={16} className="text-primary" /> Москва, ул. Портовая 1</li>
              </ul>
            </div>
          </div>
          <div className="container mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-6 text-sm text-muted-foreground sm:flex-row">
            <span>© 2026 CONTNR. Все права защищены.</span>
            <div className="flex gap-4">
              <Icon name="Send" size={18} className="cursor-pointer hover:text-primary" />
              <Icon name="MessageCircle" size={18} className="cursor-pointer hover:text-primary" />
              <Icon name="Globe" size={18} className="cursor-pointer hover:text-primary" />
            </div>
          </div>
        </footer>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onAuth={(u) => { login(u); toast({ title: 'Добро пожаловать!', description: `Вы вошли как ${u.role === 'seller' ? 'продавец' : 'покупатель'}.` }); }} />
      {user && (
        <CabinetModal
          open={cabinetOpen}
          onOpenChange={setCabinetOpen}
          user={user}
          onLogout={() => { logout(); setCabinetOpen(false); toast({ title: 'Вы вышли из аккаунта' }); }}
        />
      )}
    </div>
  );
}
