import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArticleModal } from "@/components/article-modal";
import { ContactModal } from "@/components/contact-modal";
import { 
  BookOpen, 
  Search, 
  HelpCircle, 
  Calculator, 
  FileText, 
  Users, 
  Shield, 
  Home,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Book,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Hammer,
  Receipt,
  UserCheck,
  Palette
} from "lucide-react";
import { motion } from "framer-motion";
import type { GuideArticle } from "@/types/guide";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function Guide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const articles: GuideArticle[] = [
    {
      id: 1,
      title: "Как правильно выбрать квартиру для покупки",
      description: "Подробное руководство по выбору недвижимости: от анализа района до проверки документов",
      category: "buying",
      readTime: "8 мин",
      difficulty: "beginner",
      popular: true,
      icon: Home,
      content: {
        intro: "Покупка квартиры - одно из самых важных финансовых решений в жизни. Этот гид поможет вам сделать правильный выбор и избежать распространенных ошибок при покупке недвижимости.",
        sections: [
          {
            title: "Определение бюджета и типа жилья",
            text: "Первый шаг - четкое понимание своих финансовых возможностей. Учитывайте не только стоимость квартиры, но и дополнительные расходы: ремонт, коммунальные платежи, налоги. Определите тип жилья: новостройка или вторичное жилье, количество комнат, минимальная площадь."
          },
          {
            title: "Выбор района и расположения",
            text: "Изучите инфраструктуру района: транспортную доступность, наличие школ, детских садов, поликлиник, магазинов. Оцените перспективы развития района, планы по строительству новых объектов. Проверьте экологическую обстановку и уровень безопасности."
          },
          {
            title: "Проверка документов и юридическая чистота",
            text: "Тщательно проверьте все документы на квартиру: право собственности, отсутствие обременений и долгов. Изучите историю перехода прав собственности. При необходимости обратитесь к профессиональному юристу для проведения проверки."
          }
        ],
        conclusion: "Выбор квартиры требует внимательного подхода и тщательного анализа всех факторов. Не торопитесь с принятием решения и помните, что качественная проверка на начальном этапе поможет избежать проблем в будущем.",
        tips: [
          "Посещайте объект в разное время суток",
          "Общайтесь с соседями для получения дополнительной информации",
          "Проверяйте качество коммуникаций и состояние общего имущества дома",
          "Сохраняйте все документы и переписку с продавцом",
          "Рассматривайте несколько вариантов перед принятием окончательного решения"
        ]
      }
    },
    {
      id: 2,
      title: "Ипотека в Казахстане: полное руководство 2024",
      description: "Все о получении ипотеки: требования банков, процентные ставки, необходимые документы",
      category: "mortgage",
      readTime: "12 мин",
      difficulty: "intermediate",
      popular: true,
      icon: Calculator,
      content: {
        intro: "Ипотечное кредитование остается одним из основных способов приобретения жилья в Казахстане. В этом руководстве мы рассмотрим все аспекты получения ипотеки в 2024 году, актуальные программы и условия банков.",
        sections: [
          {
            title: "Государственные программы и субсидии",
            text: "В Казахстане действует несколько государственных программ поддержки ипотечного кредитования. Особое внимание уделяется программам для молодых семей, работников бюджетной сферы и военнослужащих. Каждая программа имеет свои условия и требования к заемщикам."
          },
          {
            title: "Требования банков к заемщикам",
            text: "Основные требования включают стабильный доход, хорошую кредитную историю, официальное трудоустройство. Банки оценивают платежеспособность заемщика, соотношение ежемесячного платежа к доходу, наличие других кредитов и обязательств."
          },
          {
            title: "Процесс оформления ипотеки",
            text: "От подачи заявки до получения ключей от квартиры проходит несколько этапов. Важно правильно подготовить все документы, пройти оценку платежеспособности, выбрать подходящий объект недвижимости и провести сделку с соблюдением всех юридических формальностей."
          }
        ],
        conclusion: "Выбор ипотечной программы и банка требует тщательного анализа всех условий. Важно оценить свои финансовые возможности и выбрать оптимальный вариант кредитования.",
        tips: [
          "Сравнивайте условия разных банков и программ",
          "Подготовьте все документы заранее",
          "Проверяйте возможность досрочного погашения",
          "Учитывайте дополнительные расходы: страховка, оценка, комиссии",
          "Рассчитывайте максимальную сумму платежа с запасом"
        ]
      }
    },
    {
      id: 3,
      title: "Проверка юридической чистоты квартиры",
      description: "Как избежать мошенничества и проверить все документы перед покупкой",
      category: "legal",
      readTime: "6 мин",
      difficulty: "intermediate",
      popular: true,
      icon: Shield,
      content: {
        intro: "Юридическая чистота квартиры - ключевой фактор безопасной сделки. Мы расскажем, как провести комплексную проверку и защитить себя от мошенничества при покупке недвижимости.",
        sections: [
          {
            title: "Проверка документов собственности",
            text: "Необходимо проверить основания возникновения права собственности, историю переходов права, наличие обременений и арестов. Особое внимание следует уделить документам, подтверждающим право собственности продавца."
          },
          {
            title: "Проверка собственников и прописанных лиц",
            text: "Важно установить всех собственников квартиры, включая несовершеннолетних. Проверить наличие прописанных лиц, их права и возможность выписки. Особое внимание уделить защите прав несовершеннолетних и других защищенных категорий граждан."
          },
          {
            title: "Проверка задолженностей и обременений",
            text: "Проверьте наличие задолженностей по коммунальным платежам, налогам, кредитам. Убедитесь в отсутствии обременений, арестов, запретов на регистрационные действия. Получите выписку из ЕГРН и проверьте актуальность информации."
          }
        ],
        conclusion: "Тщательная юридическая проверка квартиры поможет избежать проблем после покупки. При необходимости обратитесь к профессиональному юристу для проведения комплексной проверки.",
        tips: [
          "Запросите расширенную выписку из ЕГРН",
          "Проверьте паспорт продавца на подлинность",
          "Изучите историю владения квартирой",
          "Получите справку об отсутствии задолженностей",
          "Проверьте информацию о банкротстве продавца"
        ]
      }
    },
    {
      id: 4,
      title: "Аренда квартиры: права и обязанности сторон",
      description: "Что нужно знать арендаторам и арендодателям о своих правах и обязанностях",
      category: "rental",
      readTime: "10 мин",
      difficulty: "beginner",
      popular: true,
      icon: FileText,
      content: {
        intro: "Аренда квартиры - это правовые отношения, в которых важно понимать права и обязанности обеих сторон. Этот гид поможет разобраться в основных аспектах арендных отношений.",
        sections: [
          {
            title: "Договор аренды: основные положения",
            text: "Правильно составленный договор аренды - основа успешных арендных отношений. В нем должны быть четко прописаны срок аренды, размер и порядок оплаты, права и обязанности сторон, условия расторжения договора."
          },
          {
            title: "Права и обязанности арендатора",
            text: "Арендатор имеет право пользоваться жильем в соответствии с договором, требовать устранения недостатков. Обязан своевременно вносить плату, поддерживать чистоту и порядок, соблюдать правила проживания."
          },
          {
            title: "Права и обязанности арендодателя",
            text: "Арендодатель обязан предоставить жилье в пригодном состоянии, обеспечивать работу коммуникаций, проводить капитальный ремонт. Имеет право проверять состояние квартиры, требовать своевременной оплаты."
          }
        ],
        conclusion: "Успешные арендные отношения строятся на взаимном уважении и соблюдении договоренностей. Четкое понимание своих прав и обязанностей поможет избежать конфликтов.",
        tips: [
          "Фиксируйте состояние квартиры при заселении",
          "Храните копии всех платежных документов",
          "Сразу обсуждайте спорные моменты",
          "Внимательно читайте договор перед подписанием",
          "Составьте акт приема-передачи имущества"
        ]
      }
    },
    {
      id: 5,
      title: "Инвестиции в недвижимость для начинающих",
      description: "Как начать инвестировать в недвижимость и получать пассивный доход",
      category: "investment",
      readTime: "15 мин",
      difficulty: "intermediate",
      popular: true,
      icon: TrendingUp,
      content: {
        intro: "Инвестиции в недвижимость остаются одним из самых надежных способов сохранения и приумножения капитала. Разберем основные стратегии инвестирования и способы получения дохода от недвижимости.",
        sections: [
          {
            title: "Виды инвестиций в недвижимость",
            text: "Существует несколько основных стратегий: покупка для сдачи в аренду, перепродажа после ремонта, инвестиции в строящееся жилье. Каждая стратегия имеет свои особенности, риски и потенциальную доходность."
          },
          {
            title: "Анализ рынка и выбор объекта",
            text: "Успешные инвестиции начинаются с тщательного анализа рынка. Важно изучить динамику цен, спрос на разные типы недвижимости, перспективы развития районов. Правильный выбор объекта - ключ к успешным инвестициям."
          },
          {
            title: "Финансовое планирование",
            text: "Необходимо учитывать все расходы: первоначальные инвестиции, ремонт, налоги, коммунальные платежи. Рассчитайте потенциальную доходность и срок окупаемости. Оцените риски и создайте финансовый резерв."
          }
        ],
        conclusion: "Инвестиции в недвижимость требуют тщательного планирования и анализа. Начинайте с небольших проектов и постепенно наращивайте портфель инвестиций.",
        tips: [
          "Диверсифицируйте инвестиционный портфель",
          "Создайте финансовый резерв для непредвиденных расходов",
          "Следите за тенденциями рынка недвижимости",
          "Работайте с проверенными партнерами",
          "Регулярно анализируйте эффективность инвестиций"
        ]
      }
    },
    {
      id: 6,
      title: "Как сделать ремонт в новой квартире",
      description: "Пошаговое руководство по ремонту: от планирования до финальных штрихов",
      category: "renovation",
      readTime: "8 мин",
      difficulty: "advanced",
      popular: false,
      icon: Hammer,
      content: {
        intro: "Ремонт в новой квартире - это сложный процесс, требующий тщательного планирования и контроля. Наше руководство поможет вам организовать ремонт эффективно и избежать распространенных ошибок.",
        sections: [
          {
            title: "Планирование и дизайн",
            text: "Начните с создания детального плана ремонта и дизайн-проекта. Определите стиль, цветовую гамму, материалы. Составьте список необходимых работ и их последовательность. Рассчитайте предварительный бюджет."
          },
          {
            title: "Выбор материалов и подрядчиков",
            text: "Тщательно выбирайте материалы, учитывая их качество, долговечность и соответствие бюджету. При выборе подрядчиков проверяйте их опыт, отзывы, портфолио. Заключите договор с четким описанием работ и сроков."
          },
          {
            title: "Контроль работ и приемка",
            text: "Регулярно контролируйте ход работ, соответствие проекту и качество исполнения. Фиксируйте все этапы работ фотографиями. Принимайте работы поэтапно, составляя акты приемки."
          }
        ],
        conclusion: "Успешный ремонт требует внимания к деталям и хорошей организации процесса. Не экономьте на качестве материалов и работ, это может привести к дополнительным расходам в будущем.",
        tips: [
          "Создайте подробный план-график работ",
          "Закладывайте финансовый резерв 15-20% от бюджета",
          "Храните все чеки и документы",
          "Проверяйте наличие необходимых сертификатов у материалов",
          "Согласовывайте шумные работы с соседями"
        ]
      }
    },
    {
      id: 7,
      title: "Оформление перепланировки квартиры",
      description: "Законное оформление перепланировки: документы, процедуры, сроки",
      category: "legal",
      readTime: "7 мин",
      difficulty: "beginner",
      popular: false,
      icon: FileText,
      content: {
        intro: "Перепланировка квартиры требует официального оформления и согласования. Разберем процесс легализации перепланировки и необходимые для этого документы.",
        sections: [
          {
            title: "Что можно и нельзя менять",
            text: "Существуют строгие ограничения на изменения в квартире. Нельзя трогать несущие конструкции, переносить стояки водоснабжения и канализации, увеличивать нагрузку на перекрытия. Разрешается объединять комнаты, переносить межкомнатные перегородки."
          },
          {
            title: "Подготовка документов",
            text: "Необходимо подготовить технический план, проект перепланировки, согласования с коммунальными службами. Все документы должны соответствовать строительным нормам и правилам. Проект должен быть разработан лицензированной организацией."
          },
          {
            title: "Процесс согласования",
            text: "Подайте документы в уполномоченный орган, получите разрешение на проведение работ. После завершения перепланировки пригласите комиссию для приемки работ. Получите новый технический паспорт и внесите изменения в ЕГРН."
          }
        ],
        conclusion: "Правильное оформление перепланировки защитит вас от проблем при продаже квартиры и штрафов. Не пытайтесь сэкономить на официальном оформлении.",
        tips: [
          "Консультируйтесь со специалистами до начала работ",
          "Сохраняйте все документы и согласования",
          "Следите за сроками действия разрешений",
          "Фотографируйте все этапы работ",
          "Проверяйте лицензии подрядчиков"
        ]
      }
    },
    {
      id: 8,
      title: "Оценка стоимости недвижимости",
      description: "Факторы, влияющие на стоимость недвижимости и методы оценки",
      category: "investment",
      readTime: "9 мин",
      difficulty: "intermediate",
      popular: false,
      icon: Calculator,
      content: {
        intro: "Правильная оценка стоимости недвижимости - ключевой фактор успешной сделки. Рассмотрим основные методы оценки и факторы, влияющие на стоимость объекта.",
        sections: [
          {
            title: "Методы оценки недвижимости",
            text: "Существует три основных метода: сравнительный (анализ аналогичных объектов), доходный (оценка потенциального дохода) и затратный (расчет стоимости строительства). Каждый метод имеет свои особенности и применяется в зависимости от типа недвижимости."
          },
          {
            title: "Факторы, влияющие на стоимость",
            text: "На стоимость влияют: расположение, состояние объекта, инфраструктура района, транспортная доступность, этаж, планировка, качество строительства. Важно учитывать также экономические факторы: спрос, предложение, общее состояние рынка."
          },
          {
            title: "Работа с оценщиком",
            text: "Профессиональный оценщик проведет детальный анализ объекта, соберет необходимые документы, применит соответствующие методики оценки. Результатом станет официальный отчет об оценке, который можно использовать для сделок и в суде."
          }
        ],
        conclusion: "Точная оценка стоимости недвижимости требует учета множества факторов и профессионального подхода. Не пренебрегайте услугами квалифицированных оценщиков.",
        tips: [
          "Собирайте информацию о похожих объектах",
          "Учитывайте сезонные колебания цен",
          "Анализируйте тенденции рынка",
          "Проверяйте лицензию оценщика",
          "Сохраняйте все документы по оценке"
        ]
      }
    },
    {
      id: 9,
      title: "Налоги при операциях с недвижимостью",
      description: "Все о налогах при покупке, продаже и сдаче в аренду недвижимости",
      category: "legal",
      readTime: "10 мин",
      difficulty: "advanced",
      popular: false,
      icon: Receipt,
      content: {
        intro: "Операции с недвижимостью всегда связаны с налоговыми обязательствами. Разберемся, какие налоги нужно платить при различных операциях с недвижимостью и как их оптимизировать законным способом.",
        sections: [
          {
            title: "Налоги при покупке недвижимости",
            text: "При покупке недвижимости возникает обязанность по уплате налога на имущество. Также можно получить налоговый вычет при покупке жилья. Рассмотрим условия получения вычета и порядок его оформления."
          },
          {
            title: "Налоги при продаже недвижимости",
            text: "При продаже недвижимости нужно заплатить НДФЛ, если объект находился в собственности менее определенного срока. Разберем случаи освобождения от налога и способы уменьшения налоговой базы."
          },
          {
            title: "Налогообложение арендного бизнеса",
            text: "При сдаче недвижимости в аренду необходимо платить налог с полученного дохода. Рассмотрим различные варианты оформления арендного бизнеса: как физическое лицо, ИП или самозанятый."
          }
        ],
        conclusion: "Правильное понимание налоговых обязательств поможет избежать штрафов и оптимизировать расходы. Консультируйтесь с налоговыми специалистами при сложных сделках.",
        tips: [
          "Сохраняйте все документы по сделкам",
          "Своевременно подавайте налоговые декларации",
          "Используйте законные способы оптимизации налогов",
          "Следите за изменениями в налоговом законодательстве",
          "Ведите учет доходов и расходов"
        ]
      }
    },
    {
      id: 10,
      title: "Как выбрать риелтора",
      description: "Критерии выбора надежного риелтора и агентства недвижимости",
      category: "service",
      readTime: "5 мин",
      difficulty: "beginner",
      popular: true,
      icon: UserCheck,
      content: {
        intro: "Выбор профессионального риелтора - важный шаг к успешной сделке с недвижимостью. Рассмотрим основные критерии выбора и признаки надежного специалиста.",
        sections: [
          {
            title: "Квалификация и опыт",
            text: "Проверьте образование, сертификаты, членство в профессиональных организациях. Узнайте опыт работы на рынке недвижимости, количество успешных сделок. Попросите показать примеры реализованных проектов."
          },
          {
            title: "Репутация и отзывы",
            text: "Изучите отзывы клиентов, репутацию агентства недвижимости. Проверьте наличие офиса, официального сайта, документов. Поговорите с предыдущими клиентами, если возможно."
          },
          {
            title: "Условия сотрудничества",
            text: "Обсудите условия работы, размер комиссии, порядок оплаты. Внимательно читайте договор, обращайте внимание на обязательства сторон и условия расторжения договора."
          }
        ],
        conclusion: "Профессиональный риелтор поможет сэкономить время и избежать рисков при сделках с недвижимостью. Не спешите с выбором, тщательно проверяйте все рекомендации.",
        tips: [
          "Проверяйте документы и лицензии",
          "Сравнивайте условия разных агентств",
          "Обращайте внимание на коммуникативные навыки",
          "Уточняйте все условия сотрудничества",
          "Заключайте официальный договор"
        ]
      }
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "Какие документы нужны для покупки квартиры?",
      answer: "Для покупки квартиры вам понадобятся: паспорт, справка о доходах, выписка из банка о наличии средств. Продавец должен предоставить: правоустанавливающие документы, техпаспорт, справку об отсутствии задолженности по коммунальным платежам.",
      category: "buying"
    },
    {
      question: "Сколько составляет первоначальный взнос по ипотеке?",
      answer: "В большинстве банков Казахстана первоначальный взнос составляет от 20% до 30% от стоимости недвижимости. Некоторые банки предлагают программы с первоначальным взносом от 10% для определенных категорий заемщиков.",
      category: "mortgage"
    },
    {
      question: "Как проверить, не находится ли квартира в залоге?",
      answer: "Проверить залоговый статус можно через Единый реестр залогов на сайте Министерства юстиции РК. Также обязательно запросите справку из банка об отсутствии обременений.",
      category: "legal"
    },
    {
      question: "Можно ли расторгнуть договор аренды досрочно?",
      answer: "Да, договор аренды можно расторгнуть досрочно при соблюдении условий, прописанных в договоре. Обычно требуется уведомление за 1 месяц. При нарушении условий одной из сторон договор может быть расторгнут немедленно.",
      category: "rental"
    },
    {
      question: "Какие районы Астаны лучше всего подходят для инвестиций?",
      answer: "Наиболее перспективными для инвестиций считаются: Есильский район (центр), новые микрорайоны на левом берегу, районы возле крупных торговых центров. Важно учитывать развитие инфраструктуры и транспортную доступность.",
      category: "investment"
    },
    {
      question: "Что включается в коммунальные платежи?",
      answer: "В коммунальные платежи обычно входят: отопление, водоснабжение, водоотведение, электроэнергия, газ (если есть), вывоз мусора, содержание общего имущества. Размер платежей зависит от площади квартиры и тарифов в вашем регионе.",
      category: "rental"
    },
    {
      question: "Как рассчитать ежемесячный платеж по ипотеке?",
      answer: "Ежемесячный платеж рассчитывается по формуле аннуитетных платежей и зависит от суммы кредита, процентной ставки и срока кредитования. Большинство банков предоставляют онлайн-калькуляторы для предварительного расчета.",
      category: "mortgage"
    },
    {
      question: "Нужно ли платить комиссию риелтору?",
      answer: "Комиссия риелтора обычно составляет 2-5% от стоимости сделки. Кто платит комиссию (покупатель или продавец) определяется договором. Иногда комиссия делится между сторонами.",
      category: "buying"
    }
  ];

  const categories = [
    { value: "all", label: "Все категории", count: articles.length },
    { value: "buying", label: "Покупка", count: articles.filter(a => a.category === "buying").length },
    { value: "rental", label: "Аренда", count: articles.filter(a => a.category === "rental").length },
    { value: "mortgage", label: "Ипотека", count: articles.filter(a => a.category === "mortgage").length },
    { value: "legal", label: "Юридические вопросы", count: articles.filter(a => a.category === "legal").length },
    { value: "investment", label: "Инвестиции", count: articles.filter(a => a.category === "investment").length }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularArticles = articles.filter(article => article.popular);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch(difficulty) {
      case "beginner": return "Начинающий";
      case "intermediate": return "Средний";
      case "advanced": return "Продвинутый";
      default: return difficulty;
    }
  };

  // Добавляем функцию для плавной прокрутки
  const scrollToArticles = () => {
    const articlesSection = document.getElementById('articles-section');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Добавляем обработчик клика по карточке
  const handleArticleClick = (article: GuideArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Декоративный фон */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_50%)]" />
          
          {/* Анимированные элементы фона */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [1, 0.8, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-bl from-indigo-100/30 to-blue-200/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Левая колонка с текстом */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm">
                <Sparkles className="w-4 h-4" />
                Ваш путеводитель в мире недвижимости
            </div>

              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                >
                  RealГид — ваш 
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    эксперт по недвижимости
                  </span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl text-gray-600 max-w-xl"
                >
                  Полезные статьи, советы экспертов и актуальные новости рынка недвижимости в одном месте
                </motion.p>
              </div>

              {/* Преимущества */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Book className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Полезные статьи</h3>
                    <p className="text-sm text-gray-600">Практические советы и рекомендации</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Экспертное мнение</h3>
                    <p className="text-sm text-gray-600">Комментарии профессионалов</p>
                  </div>
                </div>
              </motion.div>

              {/* CTA кнопки */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-[1.02]"
                  onClick={scrollToArticles}
                >
                  Читать статьи
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-gray-200 hover:border-blue-600/50 hover:bg-blue-50/50"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Задать вопрос эксперту
                </Button>
              </motion.div>
            </motion.div>

            {/* Правая колонка с изображением */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative lg:h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-3xl" />
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                alt="Real Estate Guide"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl shadow-blue-500/10"
              />
              
              {/* Плавающие карточки */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Book className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">100+ статей</div>
                    <div className="text-sm text-gray-600">Ежемесячно</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">50+ экспертов</div>
                    <div className="text-sm text-gray-600">На связи</div>
              </div>
            </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="articles-section">
        {/* Popular Articles */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-12">
            <Star className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Популярные статьи</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleArticleClick(article)}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <article.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge className={getDifficultyColor(article.difficulty)}>
                      {getDifficultyLabel(article.difficulty)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {article.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Читать
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Категории</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col gap-1 ${
                  selectedCategory === category.value 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "hover:border-blue-600 hover:text-blue-600"
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span className="font-medium">{category.label}</span>
                <span className="text-xs opacity-70">{category.count} статей</span>
              </Button>
            ))}
          </div>
        </section>

        {/* All Articles */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Все статьи</h2>
            <div className="text-sm text-gray-600">
              Найдено {filteredArticles.length} статей
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <div className="text-gray-400 text-lg mb-4">Статьи не найдены</div>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить поисковый запрос или выбрать другую категорию
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                variant="outline"
              >
                Показать все статьи
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  onClick={() => handleArticleClick(article)}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <article.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getDifficultyColor(article.difficulty)}>
                            {getDifficultyLabel(article.difficulty)}
                          </Badge>
                          {article.popular && (
                            <Badge className="bg-orange-100 text-orange-800">
                              <Star className="h-3 w-3 mr-1" />
                              Популярная
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg line-clamp-2">
                          {article.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                          {article.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 hover:text-blue-700 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArticleClick(article);
                          }}
                        >
                        Читать статью
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="py-24 mb-12">
          <div className="flex items-center gap-2 mb-12">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Часто задаваемые вопросы</h2>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="px-6">
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Help Section */}
        <section className="py-24">
          <div className="bg-blue-50 rounded-2xl p-12 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Нужна персональная консультация?
          </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Наши эксперты готовы ответить на ваши вопросы и помочь принять правильное решение 
            при покупке или аренде недвижимости
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsContactModalOpen(true)}
              >
              Получить консультацию
            </Button>
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => setIsContactModalOpen(true)}
              >
              Задать вопрос
            </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      {/* Contact Modal */}
      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />

      <Footer />
    </div>
  );
}