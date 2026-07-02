import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/cd5a6c04-d80b-4ffa-9470-376cc5f07c44/files/7d573f0d-be5c-4720-bd62-ce3b85f3a22c.jpg';

const NAV = [
  { label: 'Каталог', id: 'catalog' },
  { label: 'Терминалы', id: 'terminals' },
  { label: 'Услуги', id: 'services' },
  { label: 'Логистика', id: 'logistics' },
  { label: 'О платформе', id: 'about' },
  { label: 'Контакты', id: 'contacts' },
];

const TICKER = [
  '20FT DRY · Владивосток · от 145 000 ₽',
  '40FT HC · Новороссийск · от 280 000 ₽',
  'REEFER 40 · Санкт-Петербург · от 690 000 ₽',
  'OPEN TOP 20 · Москва · от 210 000 ₽',
  'TANK ISO · Находка · от 850 000 ₽',
];

const FILTERS = ['Все', '20FT', '40FT', '40FT HC', 'Reefer', 'Open Top', 'Tank'];

const CONTAINERS = [
  { title: '20FT Dry Cube', type: '20FT', cond: 'Новый', price: '165 000', city: 'Владивосток', seller: 'PortLine', color: 'bg-primary', icon: 'Box' },
  { title: '40FT High Cube', type: '40FT HC', cond: 'Б/У · A', price: '285 000', city: 'Новороссийск', seller: 'SeaTrade', color: 'bg-secondary', icon: 'Container' },
  { title: 'Reefer 40FT', type: 'Reefer', cond: 'Новый', price: '720 000', city: 'СПб', seller: 'ColdCargo', color: 'bg-[hsl(190_70%_42%)]', icon: 'Snowflake' },
  { title: 'Open Top 20FT', type: 'Open Top', cond: 'Б/У · B', price: '198 000', city: 'Москва', seller: 'MetallBox', color: 'bg-primary', icon: 'PackageOpen' },
  { title: 'Tank ISO 20FT', type: 'Tank', cond: 'Новый', price: '910 000', city: 'Находка', seller: 'ChemTrans', color: 'bg-secondary', icon: 'Cylinder' },
  { title: '40FT Dry Standard', type: '40FT', cond: 'Б/У · A', price: '245 000', city: 'Калининград', seller: 'BalticBox', color: 'bg-[hsl(190_70%_42%)]', icon: 'Container' },
];

const SERVICES = [
  { icon: 'Truck', title: 'Доставка до двери', desc: 'Мультимодальная логистика по РФ и СНГ' },
  { icon: 'Wrench', title: 'Ремонт и модификация', desc: 'Переоборудование под ваши задачи' },
  { icon: 'ShieldCheck', title: 'Инспекция CSC', desc: 'Проверка состояния перед сделкой' },
  { icon: 'FileText', title: 'Оформление сделки', desc: 'Документы и страхование под ключ' },
];

const TERMINALS = [
  { city: 'Владивосток', units: '3 240', trend: '+12%' },
  { city: 'Новороссийск', units: '2 810', trend: '+8%' },
  { city: 'Санкт-Петербург', units: '4 120', trend: '+15%' },
  { city: 'Москва (сухой порт)', units: '1 950', trend: '+5%' },
];

const SELLER_STATS = [
  { label: 'Выручка за месяц', value: '4.86 млн ₽', trend: '+18.2%', icon: 'TrendingUp' },
  { label: 'Продано контейнеров', value: '37', trend: '+6', icon: 'PackageCheck' },
  { label: 'Активных объявлений', value: '124', trend: '+9', icon: 'LayoutGrid' },
  { label: 'Конверсия', value: '4.7%', trend: '+0.8%', icon: 'Target' },
];

const CHART = [42, 58, 47, 71, 64, 88, 79, 96, 84, 100, 92, 76];

const BUYER_ORDERS = [
  { id: '#CN-4821', item: '40FT High Cube', status: 'В пути', color: 'bg-primary', date: '02.07' },
  { id: '#CN-4788', item: 'Reefer 40FT', status: 'Доставлен', color: 'bg-secondary', date: '24.06' },
  { id: '#CN-4712', item: '20FT Dry', status: 'Оформление', color: 'bg-[hsl(190_70%_42%)]', date: '19.06' },
];

export default function Index() {
  const [filter, setFilter] = useState('Все');
  const [role, setRole] = useState<'seller' | 'buyer'>('seller');

  const list = filter === 'Все' ? CONTAINERS : CONTAINERS.filter((c) => c.type === filter);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground">
              <Icon name="Container" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              CONT<span className="text-primary">NR</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Icon name="LogIn" size={16} className="mr-1.5" /> Войти
            </Button>
            <Button size="sm" className="font-display font-semibold uppercase tracking-wide">
              Кабинет
            </Button>
          </div>
        </div>
      </header>

      {/* TICKER */}
      <div className="overflow-hidden border-b border-border bg-card py-2">
        <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="font-mono text-xs text-muted-foreground">
              <span className="mr-2 text-primary">◆</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden grid-glow">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Порт" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>
        <div className="container relative z-10 py-24 md:py-36">
          <div className="max-w-3xl">
            <Badge className="mb-6 animate-fade-up bg-primary/15 font-mono text-primary hover:bg-primary/15">
              МАРКЕТПЛЕЙС МОРСКИХ КОНТЕЙНЕРОВ
            </Badge>
            <h1 className="animate-fade-up font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
              Контейнеры
              <br />
              <span className="text-gradient">без посредников</span>
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-lg text-muted-foreground">
              Тысячи проверенных контейнеров от терминалов по всей стране. Покупайте, продавайте и
              управляйте логистикой в одном месте.
            </p>
            <div className="mt-8 flex max-w-lg animate-fade-up flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Тип, город или терминал…" className="h-12 bg-card pl-10 text-base" />
              </div>
              <Button size="lg" className="h-12 font-display font-semibold uppercase tracking-wide">
                Найти <Icon name="ArrowRight" size={18} className="ml-1.5" />
              </Button>
            </div>
            <div className="mt-10 flex animate-fade-up gap-8">
              {[
                ['16 400+', 'контейнеров'],
                ['48', 'терминалов'],
                ['4.9', 'рейтинг сделок'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold text-foreground">{v}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="border-t border-border py-20">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary">/ Каталог</span>
              <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight">Доступно сейчас</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                    filter === f
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c, i) => (
              <Card
                key={c.title}
                className="group overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
                style={{ animation: `fade-up 0.5s ${i * 0.05}s both` }}
              >
                <div className={`relative flex h-40 items-center justify-center ${c.color}`}>
                  <div className="container-stripes absolute inset-0 opacity-40" />
                  <Icon name={c.icon} size={64} className="relative text-background/80" />
                  <Badge className="absolute left-3 top-3 bg-background/90 font-mono text-foreground hover:bg-background/90">
                    {c.type}
                  </Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{c.cond}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} /> {c.city}
                    <span className="mx-1">·</span>
                    <Icon name="Store" size={14} /> {c.seller}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-display text-2xl font-bold text-primary">{c.price} ₽</div>
                    <Button size="sm" variant="outline" className="border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                      Купить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARDS */}
      <section className="border-t border-border bg-card/40 py-20">
        <div className="container">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">/ Личные кабинеты</span>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight">Управляйте сделками</h2>
            <div className="flex gap-1 border border-border p-1">
              <button
                onClick={() => setRole('seller')}
                className={`px-5 py-2 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                  role === 'seller' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Продавец
              </button>
              <button
                onClick={() => setRole('buyer')}
                className={`px-5 py-2 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                  role === 'buyer' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Покупатель
              </button>
            </div>
          </div>

          {role === 'seller' ? (
            <div className="mt-8 animate-fade-up">
              <div className="grid gap-4 md:grid-cols-4">
                {SELLER_STATS.map((s) => (
                  <Card key={s.label} className="border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <Icon name={s.icon} size={20} className="text-primary" />
                      <span className="font-mono text-xs text-secondary">{s.trend}</span>
                    </div>
                    <div className="mt-4 font-display text-3xl font-bold">{s.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                  </Card>
                ))}
              </div>

              <Card className="mt-4 border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold uppercase">Динамика продаж</h3>
                  <Badge className="bg-secondary/15 font-mono text-secondary hover:bg-secondary/15">12 месяцев</Badge>
                </div>
                <div className="mt-8 flex h-52 items-end gap-2">
                  {CHART.map((h, i) => (
                    <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-primary/40 to-primary transition-all duration-300 group-hover:from-secondary/60 group-hover:to-secondary"
                        style={{ height: `${h}%` }}
                      />
                      <span className="font-mono text-[10px] text-muted-foreground">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <div className="mt-8 grid animate-fade-up gap-4 lg:grid-cols-3">
              <Card className="border-border bg-card p-6 lg:col-span-2">
                <h3 className="mb-4 font-display text-xl font-semibold uppercase">Мои заказы</h3>
                <div className="space-y-3">
                  {BUYER_ORDERS.map((o) => (
                    <div key={o.id} className="flex items-center justify-between border border-border bg-background/50 p-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 ${o.color} flex items-center justify-center`}>
                          <Icon name="Package" size={20} className="text-background" />
                        </div>
                        <div>
                          <div className="font-semibold">{o.item}</div>
                          <div className="font-mono text-xs text-muted-foreground">{o.id}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-muted font-mono text-foreground hover:bg-muted">{o.status}</Badge>
                        <div className="mt-1 font-mono text-xs text-muted-foreground">{o.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="border-border bg-card p-6">
                <h3 className="mb-4 font-display text-xl font-semibold uppercase">История</h3>
                <div className="space-y-4">
                  {[
                    ['Всего покупок', '18'],
                    ['Потрачено', '5.2 млн ₽'],
                    ['В избранном', '7'],
                    ['Статус', 'Gold клиент'],
                  ].map(([l, v]) => (
                    <div key={l} className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-sm text-muted-foreground">{l}</span>
                      <span className="font-display font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-5 w-full font-display uppercase">Новый заказ</Button>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-border py-20">
        <div className="container">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">/ Услуги</span>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight">Полный цикл сделки</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Card
                key={s.title}
                className="group border-border bg-card p-6 transition-colors hover:border-primary/50"
                style={{ animation: `fade-up 0.5s ${i * 0.06}s both` }}
              >
                <div className="flex h-12 w-12 items-center justify-center bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TERMINALS + LOGISTICS */}
      <section id="terminals" className="border-t border-border bg-card/40 py-20">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div id="logistics">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">/ Терминалы</span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight">География</h2>
            <div className="mt-6 space-y-3">
              {TERMINALS.map((t) => (
                <div key={t.city} className="flex items-center justify-between border border-border bg-card p-4 transition-colors hover:border-primary/50">
                  <div className="flex items-center gap-3">
                    <Icon name="Anchor" size={20} className="text-primary" />
                    <span className="font-semibold">{t.city}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-muted-foreground">{t.units} шт.</span>
                    <span className="font-mono text-sm text-secondary">{t.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">/ Логистика</span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight">Довезём куда угодно</h2>
            <p className="mt-4 text-muted-foreground">
              Мультимодальные перевозки: авто, ж/д и морской фрахт. Отслеживание груза в реальном времени
              и прозрачный расчёт стоимости доставки.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                ['Truck', 'Авто'],
                ['Train', 'Ж/Д'],
                ['Ship', 'Море'],
              ].map(([icon, l]) => (
                <div key={l} className="flex flex-col items-center gap-2 border border-border bg-card py-6">
                  <Icon name={icon} size={28} className="text-primary" />
                  <span className="font-display font-semibold uppercase">{l}</span>
                </div>
              ))}
            </div>
            <Button className="mt-6 w-fit font-display uppercase">
              Рассчитать доставку <Icon name="Calculator" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT / CTA */}
      <section id="about" className="border-t border-border py-24 grid-glow">
        <div className="container text-center">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
            Начните торговать <span className="text-gradient">контейнерами</span> уже сегодня
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Регистрация бесплатна. Разместите объявление или найдите контейнер за пару минут.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-12 font-display font-semibold uppercase tracking-wide">Стать продавцом</Button>
            <Button size="lg" variant="outline" className="h-12 border-primary/40 font-display font-semibold uppercase tracking-wide">
              Купить контейнер
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="border-t border-border bg-card py-14">
        <div className="container grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground">
                <Icon name="Container" size={20} />
              </div>
              <span className="font-display text-xl font-bold">
                CONT<span className="text-primary">NR</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Маркетплейс морских контейнеров №1 в России.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold uppercase">Платформа</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#catalog" className="hover:text-primary">Каталог</a></li>
              <li><a href="#services" className="hover:text-primary">Услуги</a></li>
              <li><a href="#terminals" className="hover:text-primary">Терминалы</a></li>
              <li><a href="#about" className="hover:text-primary">О платформе</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold uppercase">Правовое</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Условия использования</a></li>
              <li><a href="#" className="hover:text-primary">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-primary">Оферта</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold uppercase">Контакты</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Icon name="Phone" size={16} className="text-primary" /> 8 800 555-35-35</li>
              <li className="flex items-center gap-2"><Icon name="Mail" size={16} className="text-primary" /> hello@contnr.ru</li>
              <li className="flex items-center gap-2"><Icon name="MapPin" size={16} className="text-primary" /> Москва, ул. Портовая 1</li>
            </ul>
          </div>
        </div>
        <div className="container mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <span>© 2026 CONTNR. Все права защищены.</span>
          <div className="flex gap-4">
            <Icon name="Send" size={18} className="cursor-pointer hover:text-primary" />
            <Icon name="MessageCircle" size={18} className="cursor-pointer hover:text-primary" />
            <Icon name="Globe" size={18} className="cursor-pointer hover:text-primary" />
          </div>
        </div>
      </footer>
    </div>
  );
}
