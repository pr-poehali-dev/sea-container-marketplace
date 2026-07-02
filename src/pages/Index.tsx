import { useState, useRef } from 'react';
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

const PROMO_SLIDES = [
  {
    tag: 'Акция',
    title: 'Скидка 15%',
    sub: 'на 40FT High Cube',
    desc: 'При покупке от 5 контейнеров',
    badge: '-15%',
    from: 'from-violet-600',
    to: 'to-fuchsia-500',
    icon: 'Container',
  },
  {
    tag: 'Горячее предложение',
    title: 'Рефрижераторы',
    sub: 'со склада Новороссийск',
    desc: 'Готовы к отгрузке, документы включены',
    badge: 'HOT',
    from: 'from-fuchsia-600',
    to: 'to-pink-500',
    icon: 'Snowflake',
  },
  {
    tag: 'Спец условия',
    title: 'Лизинг 0%',
    sub: 'на 12 месяцев',
    desc: 'Для юридических лиц и ИП',
    badge: '0%',
    from: 'from-purple-700',
    to: 'to-violet-500',
    icon: 'Landmark',
  },
  {
    tag: 'Партнёрам',
    title: 'Оптовые цены',
    sub: 'от 10 единиц',
    desc: 'Персональный менеджер и скидка до 20%',
    badge: '-20%',
    from: 'from-indigo-600',
    to: 'to-purple-500',
    icon: 'HandCoins',
  },
];

const NOVELTY = [
  { title: '20FT Dry 2025', cond: 'Новый', price: '178 000 ₽', oldPrice: '195 000 ₽', city: 'Москва', seller: 'PortLine', rating: 4.9, icon: 'Box', tag: '20FT' },
  { title: '40FT HC 2025', cond: 'Новый', price: '312 000 ₽', oldPrice: null, city: 'СПб', seller: 'SeaTrade', rating: 5.0, icon: 'Container', tag: '40FT HC' },
  { title: 'Reefer 40 2025', cond: 'Новый', price: '740 000 ₽', oldPrice: '790 000 ₽', city: 'Владивосток', seller: 'ColdCargo', rating: 4.8, icon: 'Snowflake', tag: 'Reefer' },
  { title: '45FT Pallet Wide', cond: 'Новый', price: '355 000 ₽', oldPrice: null, city: 'Новороссийск', seller: 'BalticBox', rating: 4.9, icon: 'Container', tag: '45FT' },
  { title: 'Open Top 20 2025', cond: 'Новый', price: '215 000 ₽', oldPrice: '230 000 ₽', city: 'Екатеринбург', seller: 'UralCont', rating: 4.7, icon: 'PackageOpen', tag: 'Open Top' },
];

const HITS = [
  { title: '20FT Dry Б/У «A»', cond: 'Б/У · A', price: '142 000 ₽', city: 'Москва', seller: 'МегаКонт', sales: 218, rating: 4.9, icon: 'Box', tag: '20FT' },
  { title: '40FT High Cube', cond: 'Б/У · A', price: '265 000 ₽', city: 'СПб', seller: 'СевZапад', sales: 187, rating: 4.8, icon: 'Container', tag: '40FT HC' },
  { title: 'Reefer 40FT', cond: 'Новый', price: '695 000 ₽', city: 'Новороссийск', seller: 'ЮгТранс', sales: 143, rating: 5.0, icon: 'Snowflake', tag: 'Reefer' },
  { title: '20FT Dry Стандарт', cond: 'Б/У · B', price: '125 000 ₽', city: 'Казань', seller: 'ВолгаКонт', sales: 132, rating: 4.7, icon: 'Box', tag: '20FT' },
];

const TABS_DATA = {
  '20FT': [
    { title: '20FT Dry «A»', price: '142 000 ₽', old: '160 000 ₽', city: 'Москва', cond: 'Б/У · A' },
    { title: '20FT Dry Новый', price: '178 000 ₽', old: null, city: 'СПб', cond: 'Новый' },
    { title: '20FT Open Top', price: '215 000 ₽', old: '230 000 ₽', city: 'Казань', cond: 'Б/У · A' },
    { title: '20FT Flat Rack', price: '188 000 ₽', old: null, city: 'Екб', cond: 'Новый' },
  ],
  '40FT': [
    { title: '40FT High Cube', price: '265 000 ₽', old: '295 000 ₽', city: 'Москва', cond: 'Б/У · A' },
    { title: '40FT Dry Новый', price: '312 000 ₽', old: null, city: 'Новороссийск', cond: 'Новый' },
    { title: '40FT Pallet Wide', price: '355 000 ₽', old: '380 000 ₽', city: 'СПб', cond: 'Б/У · A' },
    { title: '40FT Open Top', price: '290 000 ₽', old: null, city: 'Владивосток', cond: 'Новый' },
  ],
  'Скидки': [
    { title: '40FT HC -15%', price: '265 000 ₽', old: '312 000 ₽', city: 'Москва', cond: 'Новый' },
    { title: 'Reefer -10%', price: '621 000 ₽', old: '690 000 ₽', city: 'СПб', cond: 'Новый' },
    { title: '20FT Dry -12%', price: '125 000 ₽', old: '142 000 ₽', city: 'Казань', cond: 'Б/У · A' },
    { title: '45FT -8%', price: '313 000 ₽', old: '340 000 ₽', city: 'Екб', cond: 'Новый' },
  ],
  'Новости': [
    { title: 'Новый терминал Владивосток', price: null, old: null, city: '20 июня 2026', cond: 'Новости', isNews: true },
    { title: 'Лизинг 0% на 12 месяцев', price: null, old: null, city: '12 июня 2026', cond: 'Акция', isNews: true },
    { title: 'Скидки до 20% оптом', price: null, old: null, city: '05 июня 2026', cond: 'Акция', isNews: true },
    { title: 'Reefer теперь с доставкой', price: null, old: null, city: '28 мая 2026', cond: 'Сервис', isNews: true },
  ],
  'Спец условия': [
    { title: 'Лизинг от 0%', price: 'от 25 000 ₽/мес', old: null, city: 'По всей РФ', cond: 'ИП / ООО' },
    { title: 'Рассрочка 12 мес', price: 'без % и доп.условий', old: null, city: 'По всей РФ', cond: 'Физ. лица' },
    { title: 'Оптовая скидка', price: 'до -20%', old: null, city: 'от 10 единиц', cond: 'Оптом' },
    { title: 'Факторинг', price: 'отсрочка 90 дней', old: null, city: 'Юр. лица', cond: 'Бизнес' },
  ],
} as Record<string, { title: string; price: string | null; old: string | null; city: string; cond: string; isNews?: boolean }[]>;

export default function Index() {
  const { theme, toggle } = useTheme();
  const { user, login, logout } = useAuth();
  const { toast } = useToast();
  const [authOpen, setAuthOpen] = useState(false);
  const [cabinetOpen, setCabinetOpen] = useState(false);
  const [promoIdx, setPromoIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('20FT');
  const noveltyRef = useRef<HTMLDivElement>(null);
  const hitsRef = useRef<HTMLDivElement>(null);

  const openCabinet = () => (user ? setCabinetOpen(true) : setAuthOpen(true));

  const notify = (title: string) =>
    toast({ title, description: 'Раздел в разработке — скоро здесь появится контент.' });

  const scrollRow = (ref: React.RefObject<HTMLDivElement>, dir: number) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

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

        {/* ===== PROMO SLIDER ===== */}
        <section className="py-12">
          <div className="container">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">Акции и скидки</span>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-gradient">Горячие предложения</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setPromoIdx(i => Math.max(0, i - 1))} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-colors hover:border-primary hover:text-primary disabled:opacity-30" disabled={promoIdx === 0}>
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button onClick={() => setPromoIdx(i => Math.min(PROMO_SLIDES.length - 1, i + 1))} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-colors hover:border-primary hover:text-primary disabled:opacity-30" disabled={promoIdx === PROMO_SLIDES.length - 1}>
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>

            {/* desktop 4 cols, tablet 2, mobile 1 — slide offset */}
            <div className="overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(calc(-${promoIdx} * (100% / 4 + 4px)))` }}
              >
                {PROMO_SLIDES.map((s, i) => (
                  <div key={i} className="relative min-w-[calc(50%-8px)] shrink-0 overflow-hidden rounded-3xl lg:min-w-[calc(25%-12px)]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.from} ${s.to} opacity-90`} />
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 12px,rgba(255,255,255,.3) 12px,rgba(255,255,255,.3) 13px)' }} />
                    <div className="relative p-6">
                      <div className="mb-3 flex items-start justify-between">
                        <Badge className="rounded-full bg-white/20 text-white hover:bg-white/20">{s.tag}</Badge>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
                          <Icon name={s.icon} size={22} />
                        </div>
                      </div>
                      <div className="mt-2 font-display text-4xl font-bold text-white">{s.badge}</div>
                      <div className="mt-1 font-display text-xl font-bold text-white">{s.title}</div>
                      <div className="text-white/80">{s.sub}</div>
                      <div className="mt-3 text-sm text-white/70">{s.desc}</div>
                      <button onClick={() => notify(s.title)} className="mt-4 flex items-center gap-1.5 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/30">
                        Подробнее <Icon name="ArrowRight" size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* dots */}
            <div className="mt-4 flex justify-center gap-2">
              {PROMO_SLIDES.map((_, i) => (
                <button key={i} onClick={() => setPromoIdx(i)} className={`h-2 rounded-full transition-all ${i === promoIdx ? 'w-6 bg-primary' : 'w-2 bg-border'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== NOVELTY ===== */}
        <section className="py-10">
          <div className="container">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">Свежие поступления</span>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-gradient">Новинки контейнеров</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => scrollRow(noveltyRef, -1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:border-primary hover:text-primary"><Icon name="ChevronLeft" size={20} /></button>
                <button onClick={() => scrollRow(noveltyRef, 1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:border-primary hover:text-primary"><Icon name="ChevronRight" size={20} /></button>
              </div>
            </div>
            <div ref={noveltyRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {NOVELTY.map((c, i) => (
                <button key={i} onClick={() => notify(c.title)}
                  className="group glass min-w-[240px] shrink-0 rounded-3xl p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-transform group-hover:scale-110">
                      <Icon name={c.icon} size={26} />
                    </div>
                    <Badge className="rounded-full bg-green-500/15 text-green-600 hover:bg-green-500/15 dark:text-green-400">NEW</Badge>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold">{c.title}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} /> {c.city} · {c.cond}
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={12} className={s <= Math.round(c.rating) ? 'text-yellow-400' : 'text-border'} />)}
                    <span className="ml-1 text-xs text-muted-foreground">{c.rating}</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-display text-lg font-bold text-primary">{c.price}</div>
                    {c.oldPrice && <div className="text-xs text-muted-foreground line-through">{c.oldPrice}</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HITS ===== */}
        <section className="py-10">
          <div className="container">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">Лучшие продавцы</span>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-gradient">Хиты продаж</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => scrollRow(hitsRef, -1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:border-primary hover:text-primary"><Icon name="ChevronLeft" size={20} /></button>
                <button onClick={() => scrollRow(hitsRef, 1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:border-primary hover:text-primary"><Icon name="ChevronRight" size={20} /></button>
              </div>
            </div>
            <div ref={hitsRef} className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {HITS.map((c, i) => (
                <button key={i} onClick={() => notify(c.title)}
                  className="group glass min-w-[260px] shrink-0 rounded-3xl p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-transform group-hover:scale-110">
                      <Icon name={c.icon} size={26} />
                    </div>
                    <div className="flex items-center gap-1 rounded-xl bg-orange-500/15 px-2.5 py-1 text-xs font-bold text-orange-500">
                      <Icon name="Flame" size={13} /> {c.sales} продаж
                    </div>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold">{c.title}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Store" size={12} /> {c.seller} · <Icon name="MapPin" size={12} /> {c.city}
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={12} className={s <= Math.round(c.rating) ? 'text-yellow-400' : 'text-border'} />)}
                    <span className="ml-1 text-xs text-muted-foreground">{c.rating}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-display text-lg font-bold text-primary">{c.price}</div>
                    <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">{c.tag}</Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TABS BLOCK ===== */}
        <section className="py-10">
          <div className="container">
            <div className="mb-6">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Блок товаров</span>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-gradient">Выбирайте по категории</h2>
            </div>
            {/* tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {Object.keys(TABS_DATA).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`rounded-xl border px-5 py-2 font-display text-sm font-semibold uppercase tracking-wide transition-all ${activeTab === tab ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TABS_DATA[activeTab].map((item, i) => (
                <button key={i} onClick={() => notify(item.title)}
                  className="group glass rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                  style={{ animation: `fade-up 0.35s ${i * 0.05}s both` }}
                >
                  {item.isNews ? (
                    <>
                      <Badge className="mb-3 rounded-full bg-primary/10 text-primary hover:bg-primary/10">{item.cond}</Badge>
                      <h3 className="font-display text-base font-bold leading-snug">{item.title}</h3>
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Calendar" size={13} /> {item.city}
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-primary">
                        Читать <Icon name="ArrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <Badge className="rounded-full bg-muted text-muted-foreground hover:bg-muted">{item.cond}</Badge>
                        {item.old && <span className="text-xs text-green-500 font-semibold">Скидка</span>}
                      </div>
                      <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="MapPin" size={12} /> {item.city}
                      </div>
                      <div className="mt-3">
                        <div className="font-display text-lg font-bold text-primary">{item.price}</div>
                        {item.old && <div className="text-xs text-muted-foreground line-through">{item.old}</div>}
                      </div>
                    </>
                  )}
                </button>
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