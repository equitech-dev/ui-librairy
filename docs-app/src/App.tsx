import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './styles/index.scss';

// Import des pages de composants
import ButtonPage from './pages/ButtonPage';
import CardPage from './pages/CardPage';
import InputPage from './pages/InputPage';
import AlertPage from './pages/AlertPage';
import SearchPage from './pages/SearchPage';
import PaginationPage from './pages/PaginationPage';
import TabsPage from './pages/TabsPage';


import LoadingPage from './pages/LoadingPage';
import ProgressPage from './pages/ProgressPage';
import RatingPage from './pages/RatingPage';
import TimelinePage from './pages/TimelinePage';
import TreePage from './pages/TreePage';
import ListPage from './pages/ListPage';
import CalendarPage from './pages/CalendarPage';
import KanbanPage from './pages/KanbanPage';
import UploadPage from './pages/UploadPage';
import RangeSliderPage from './pages/RangeSliderPage';
import ToggleSwitchPage from './pages/ToggleSwitchPage';
import AdvancedDropdownPage from './pages/AdvancedDropdownPage';
import TimePickerPage from './pages/TimePickerPage';
import ColorPickerPage from './pages/ColorPickerPage';
import FormPage from './pages/FormPage';
import FieldsetPage from './pages/FieldsetPage';
import DrawerPage from './pages/DrawerPage';
import PortalPage from './pages/PortalPage';
import OverlayPage from './pages/OverlayPage';
import DatePickerPage from './pages/DatePickerPage';
import DataTablePage from './pages/DataTablePage';
import BreadcrumbPage from './pages/BreadcrumbPage';
import AccordionPage from './pages/AccordionPage';
import StepperPage from './pages/StepperPage';
import PopoverPage from './pages/PopoverPage';

// Composant Sidebar
const Sidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    {
      title: 'Démarrage',
      links: [
        { name: 'Introduction', path: '/' },
        { name: 'Installation', path: '/installation' },
        { name: 'Système de Design', path: '/design-system' }
      ]
    },
    {
      title: 'Composants P1',
      links: [
        { name: 'Button', path: '/components/button' },
        { name: 'Card', path: '/components/card' },
        { name: 'Input', path: '/components/input' },
        { name: 'Alert', path: '/components/alert' },
        { name: 'Pagination', path: '/components/pagination' },
        { name: 'Tabs', path: '/components/tabs' },
        { name: 'ToggleSwitch', path: '/components/toggleswitch' },
        { name: 'DatePicker', path: '/components/datepicker' },
        { name: 'DataTable', path: '/components/datatable' }
      ]
    },
    {
      title: 'Navigation (P2)',
      links: [
        { name: 'Breadcrumb', path: '/components/breadcrumb' },
        { name: 'Accordion', path: '/components/accordion' },
        { name: 'Stepper', path: '/components/stepper' }
      ]
    },
    {
      title: 'Feedback (P2)',
      links: [
        { name: 'Popover', path: '/components/popover' },
        { name: 'Loading', path: '/components/loading' }
      ]
    },
    {
      title: 'Données (P2)',
      links: [
        { name: 'Progress', path: '/components/progress' },
        { name: 'Rating', path: '/components/rating' },
        { name: 'Timeline', path: '/components/timeline' },
        { name: 'Tree', path: '/components/tree' },
        { name: 'List', path: '/components/list' },
        { name: 'Calendar', path: '/components/calendar' },
        { name: 'Kanban', path: '/components/kanban' }
      ]
    },
    {
      title: 'Formulaires (P2)',
      links: [
        { name: 'Upload', path: '/components/upload' },
        { name: 'RangeSlider', path: '/components/rangeslider' },
        { name: 'ToggleSwitch', path: '/components/toggleswitch' },
        { name: 'AdvancedDropdown', path: '/components/advanced-dropdown' },
        { name: 'TimePicker', path: '/components/time-picker' },
        { name: 'ColorPicker', path: '/components/color-picker' },
        { name: 'Form', path: '/components/form' },
        { name: 'Fieldset', path: '/components/fieldset' }
      ]
    },
    {
      title: 'Layout (P2)',
      links: [
        { name: 'Drawer', path: '/components/drawer' },
        { name: 'Portal', path: '/components/portal' },
        { name: 'Overlay', path: '/components/overlay' }
      ]
    }
  ];

  return (
    <aside className="docs-sidebar">
      <nav className="docs-nav">
        {navigation.map((section, index) => (
          <div key={index} className="nav-section">
            <h3 className="nav-title">{section.title}</h3>
            <ul className="nav-links">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

// Page d'accueil
const HomePage: React.FC = () => {
  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">UI Library EQUITECH</h1>
        <p className="section-description">
          Une bibliothèque de composants React moderne et accessible, conçue pour créer des interfaces utilisateur exceptionnelles. 
          Notre collection de composants suit les meilleures pratiques UX/UI et s'adapte parfaitement à l'identité visuelle EQUITECH.
        </p>
        
        <div className="component-demo">
          <h3 className="demo-title">Caractéristiques principales</h3>
          <div className="demo-content">
            <ul>
              <li>🎨 Design System cohérent avec palette de couleurs harmonieuse</li>
              <li>♿ Accessibilité native conforme aux standards WCAG 2.1</li>
              <li>📱 Responsive design optimisé pour tous les appareils</li>
              <li>⚡ Performance optimisée avec React hooks et CSS moderne</li>
              <li>🔧 Facilement personnalisable avec variables CSS</li>
              <li>📚 Documentation complète avec exemples interactifs</li>
            </ul>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Installation rapide</h3>
          <div className="demo-content">
            <p>Installez la bibliothèque via npm :</p>
          </div>
          <pre className="demo-code">
{`npm install @equitech-dev/ui-library

# Ou avec yarn
yarn add @equitech-dev/ui-library`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Utilisation basique</h3>
          <div className="demo-content">
            <p>Importez et utilisez nos composants :</p>
          </div>
          <pre className="demo-code">
{`import { Button, Card, Input } from '@equitech-dev/ui-library';
import '@equitech-dev/ui-library/index.css';

function App() {
  return (
    <div>
      <Button variant="primary">Cliquez-moi</Button>
      <Card>
        <h2>Titre de la carte</h2>
        <p>Contenu de la carte</p>
      </Card>
      <Input placeholder="Votre texte..." />
    </div>
  );
}`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Composants disponibles</h3>
          <div className="demo-content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--ui-border-color)', borderRadius: '8px' }}>
                <h4>Composants P1 (Priorité 1)</h4>
                <ul>
                  <li>Button</li>
                  <li>Card</li>
                  <li>Input</li>
                  <li>Alert</li>
                  <li>Pagination</li>
                  <li>Tabs</li>
                  <li>Switch</li>
                  <li>DatePicker</li>
                  <li>DataTable</li>
                </ul>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--ui-border-color)', borderRadius: '8px' }}>
                <h4>Navigation (P2)</h4>
                <ul>
                  <li>Breadcrumb</li>
                  <li>Accordion</li>
                  <li>Stepper</li>
                </ul>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--ui-border-color)', borderRadius: '8px' }}>
                <h4>Feedback (P2)</h4>
                <ul>
                  <li>Popover</li>
                  <li>Skeleton</li>
                  <li>Loading</li>
                </ul>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--ui-border-color)', borderRadius: '8px' }}>
                <h4>Données (P2)</h4>
                <ul>
                  <li>Progress</li>
                  <li>Rating</li>
                  <li>Timeline</li>
                  <li>Tree</li>
                  <li>List</li>
                  <li>Calendar</li>
                  <li>Kanban</li>
                  <li>Upload</li>
                  <li>Range Slider</li>
                </ul>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--ui-border-color)', borderRadius: '8px' }}>
                <h4>Formulaires (P2)</h4>
                <ul>
                  <li>Toggle Switch</li>
                  <li>Advanced Dropdown</li>
                  <li>Time Picker</li>
                  <li>Color Picker</li>
                  <li>Form</li>
                  <li>Fieldset</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Documentation interactive</h3>
          <div className="demo-content">
            <p>Explorez nos composants avec des exemples interactifs et du code prêt à l'emploi :</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link to="/components/button" className="ui-button ui-button--primary">
                Explorer Button
              </Link>
              <Link to="/components/card" className="ui-button ui-button--secondary">
                Explorer Card
              </Link>
              <Link to="/components/input" className="ui-button ui-button--success">
                Explorer Input
              </Link>
              <Link to="/components/alert" className="ui-button ui-button--warning">
                Explorer Alert
              </Link>
              <Link to="/components/search" className="ui-button ui-button--info">
                Explorer Search
              </Link>
              <Link to="/components/pagination" className="ui-button ui-button--outline">
                Explorer Pagination
              </Link>
              <Link to="/components/tabs" className="ui-button ui-button--info">
                Explorer Tabs
              </Link>
              <Link to="/components/switch" className="ui-button ui-button--success">
                Explorer Switch
              </Link>
              <Link to="/components/upload" className="ui-button ui-button--primary">
                Explorer Upload
              </Link>
              <Link to="/components/rangeslider" className="ui-button ui-button--secondary">
                Explorer Range Slider
              </Link>
              <Link to="/components/toggle-switch" className="ui-button ui-button--success">
                Explorer Toggle Switch
              </Link>
              <Link to="/components/advanced-dropdown" className="ui-button ui-button--info">
                Explorer Advanced Dropdown
              </Link>
              <Link to="/components/time-picker" className="ui-button ui-button--primary">
                Explorer Time Picker
              </Link>
              <Link to="/components/color-picker" className="ui-button ui-button--secondary">
                Explorer Color Picker
              </Link>
              <Link to="/components/form" className="ui-button ui-button--success">
                Explorer Form
              </Link>
              <Link to="/components/fieldset" className="ui-button ui-button--warning">
                Explorer Fieldset
              </Link>
              <Link to="/design-system" className="ui-button ui-button--error">
                Système de Design
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page d'installation
const InstallationPage: React.FC = () => {
  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Installation</h1>
        <p className="section-description">
          Guide complet pour installer et configurer la UI Library EQUITECH dans votre projet.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Prérequis</h3>
          <div className="demo-content">
            <ul>
              <li>Node.js 16+</li>
              <li>React 18+</li>
              <li>npm ou yarn</li>
            </ul>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Installation via npm</h3>
          <div className="demo-content">
            <p>Installez le package depuis le registre npm :</p>
          </div>
          <pre className="demo-code">
{`npm install @equitech-dev/ui-library`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Installation via yarn</h3>
          <div className="demo-content">
            <p>Ou utilisez yarn si vous préférez :</p>
          </div>
          <pre className="demo-code">
{`yarn add @equitech-dev/ui-library`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Configuration</h3>
          <div className="demo-content">
            <p>Importez les styles dans votre fichier principal :</p>
          </div>
          <pre className="demo-code">
{`// Dans votre App.js ou index.js
import '@equitech-dev/ui-library/index.css';`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Utilisation avec TypeScript</h3>
          <div className="demo-content">
            <p>La bibliothèque inclut des types TypeScript :</p>
          </div>
          <pre className="demo-code">
{`import { Button, ButtonProps } from '@equitech-dev/ui-library';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Page du système de design
const DesignSystemPage: React.FC = () => {
  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Système de Design</h1>
        <p className="section-description">
          Découvrez notre système de design cohérent avec ses couleurs, typographie, espacement et composants.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Palette de couleurs</h3>
          <div className="demo-content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--ui-primary-color)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                Primary
              </div>
              <div style={{ background: 'var(--ui-secondary-color)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                Secondary
              </div>
              <div style={{ background: 'var(--ui-success-color)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                Success
              </div>
              <div style={{ background: 'var(--ui-warning-color)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                Warning
              </div>
              <div style={{ background: 'var(--ui-error-color)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                Error
              </div>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Typographie</h3>
          <div className="demo-content">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 1rem 0' }}>Titre H1 - 2.5rem</h1>
            <h2 style={{ fontSize: '2rem', fontWeight: '600', margin: '0 0 1rem 0' }}>Titre H2 - 2rem</h2>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 0 1rem 0' }}>Titre H3 - 1.5rem</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
              Texte de paragraphe - 1rem avec une ligne de 1.6 pour une lecture confortable.
            </p>
            <small style={{ fontSize: '0.875rem', color: 'var(--ui-text-muted)' }}>
              Texte petit - 0.875rem pour les détails et légendes.
            </small>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Espacement</h3>
          <div className="demo-content">
            <p>Notre système d'espacement utilise une échelle cohérente :</p>
            <ul>
              <li>xs: 0.25rem (4px)</li>
              <li>sm: 0.5rem (8px)</li>
              <li>md: 1rem (16px)</li>
              <li>lg: 1.5rem (24px)</li>
              <li>xl: 2rem (32px)</li>
              <li>2xl: 3rem (48px)</li>
            </ul>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Variables CSS</h3>
          <div className="demo-content">
            <p>Personnalisez facilement l'apparence avec les variables CSS :</p>
          </div>
          <pre className="demo-code">
{`:root {
  --ui-primary-color: #2563eb;
  --ui-secondary-color: #64748b;
  --ui-success-color: #059669;
  --ui-warning-color: #d97706;
  --ui-error-color: #dc2626;
  --ui-border-radius: 0.5rem;
  --ui-transition-duration: 0.2s;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Page de démonstration des composants (sans imports directs)
const ComponentsPage: React.FC = () => {
  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Composants</h1>
        <p className="section-description">
          Découvrez tous nos composants avec des exemples d'utilisation et du code.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Button</h3>
          <div className="demo-content">
            <p>Composant bouton avec plusieurs variantes, tailles et états.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button className="ui-button ui-button--primary">Primary</button>
              <button className="ui-button ui-button--secondary">Secondary</button>
              <button className="ui-button ui-button--success">Success</button>
              <button className="ui-button ui-button--warning">Warning</button>
              <button className="ui-button ui-button--error">Error</button>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/components/button" className="ui-button ui-button--primary">
                Voir la documentation complète
              </Link>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Card</h3>
          <div className="demo-content">
            <p>Composant carte pour organiser le contenu.</p>
            <div style={{ maxWidth: '300px', marginTop: '1rem' }}>
              <div className="ui-card">
                <div className="ui-card__header">
                  <h3>Titre de la carte</h3>
                </div>
                <div className="ui-card__body">
                  <p>Contenu de la carte avec du texte descriptif.</p>
                </div>
                <div className="ui-card__footer">
                  <button className="ui-button ui-button--primary">Action</button>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/components/card" className="ui-button ui-button--primary">
                Voir la documentation complète
              </Link>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Input</h3>
          <div className="demo-content">
            <p>Composant input avec différents états et variantes.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input className="ui-input" placeholder="Input normal" />
              <input className="ui-input ui-input--error" placeholder="Input avec erreur" />
              <input className="ui-input ui-input--success" placeholder="Input avec succès" />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/components/input" className="ui-button ui-button--primary">
                Voir la documentation complète
              </Link>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Alert</h3>
          <div className="demo-content">
            <p>Composant d'alerte pour les notifications et messages importants.</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-alert ui-alert--info" style={{ marginBottom: '0.5rem' }}>
                <div className="ui-alert__icon">ℹ️</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Information</h4>
                  <p>Exemple d'alerte d'information.</p>
                </div>
              </div>
              <div className="ui-alert ui-alert--success">
                <div className="ui-alert__icon">✅</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Succès</h4>
                  <p>Exemple d'alerte de succès.</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/components/alert" className="ui-button ui-button--primary">
                Voir la documentation complète
              </Link>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Pills et Badges</h3>
          <div className="demo-content">
            <p>Composants pills pour étiqueter et catégoriser le contenu.</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <span className="ui-pill ui-pill--primary">Primary</span>
              <span className="ui-pill ui-pill--success">Success</span>
              <span className="ui-pill ui-pill--warning">Warning</span>
              <span className="ui-pill ui-pill--error">Error</span>
              <span className="ui-pill ui-pill--outline">Outline</span>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Search avec Pills</h3>
          <div className="demo-content">
            <p>Composant de recherche avancée avec système de pills interactifs.</p>
            <div style={{ maxWidth: '500px', marginTop: '1rem' }}>
              <div className="ui-search-container">
                <div className="ui-search-input-wrapper">
                  <span className="ui-search-icon">🔍</span>
                  <input
                    className="ui-search-input"
                    placeholder="Rechercher et ajouter des filtres..."
                  />
                  <button className="ui-search-button">
                    Ajouter
                  </button>
                </div>
                
                <div className="ui-search-pills">
                  <div className="ui-search-pill ui-search-pill--framework">
                    <span className="ui-search-pill__label">React</span>
                    <button className="ui-search-pill__remove">×</button>
                  </div>
                  <div className="ui-search-pill ui-search-pill--language">
                    <span className="ui-search-pill__label">TypeScript</span>
                    <button className="ui-search-pill__remove">×</button>
                  </div>
                  <div className="ui-search-pill ui-search-pill--design">
                    <span className="ui-search-pill__label">UI/UX</span>
                    <button className="ui-search-pill__remove">×</button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/components/search" className="ui-button ui-button--primary">
                Voir la documentation complète
              </Link>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Pagination</h3>
          <div className="demo-content">
            <p>Composant de pagination pour naviguer entre les pages de contenu.</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-pagination">
                <button className="ui-pagination__prev">← Précédent</button>
                <div className="ui-pagination__pages">
                  <button className="ui-pagination__page ui-pagination__page--active">1</button>
                  <button className="ui-pagination__page">2</button>
                  <button className="ui-pagination__page">3</button>
                  <span className="ui-pagination__ellipsis">...</span>
                  <button className="ui-pagination__page">10</button>
                </div>
                <button className="ui-pagination__next">Suivant →</button>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/components/pagination" className="ui-button ui-button--primary">
                Voir la documentation complète
              </Link>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tabs</h3>
          <div className="demo-content">
            <p>Composant de navigation par onglets pour organiser le contenu.</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tabs">
                <div className="ui-tabs__header">
                  <button className="ui-tabs__tab ui-tabs__tab--active">
                    <span className="ui-tabs__tab-icon">📊</span>
                    <span className="ui-tabs__tab-label">Vue d'ensemble</span>
                  </button>
                  <button className="ui-tabs__tab">
                    <span className="ui-tabs__tab-icon">⚡</span>
                    <span className="ui-tabs__tab-label">Fonctionnalités</span>
                  </button>
                  <button className="ui-tabs__tab">
                    <span className="ui-tabs__tab-icon">💰</span>
                    <span className="ui-tabs__tab-label">Tarifs</span>
                  </button>
                </div>
                <div className="ui-tabs__content">
                  <div className="ui-tab-content">
                    <h3>Vue d'ensemble</h3>
                    <p>Découvrez nos composants UI et leurs fonctionnalités.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/components/tabs" className="ui-button ui-button--primary">
                Voir la documentation complète
              </Link>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Switch / Toggle</h3>
          <div className="demo-content">
            <p>Composant d'interrupteur pour activer/désactiver des fonctionnalités.</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-switch-demo">
                <div className="ui-switch-demo__item">
                  <span>Notifications push</span>
                  <label className="ui-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="ui-switch__slider"></span>
                  </label>
                </div>
                <div className="ui-switch-demo__item">
                  <span>Mode sombre</span>
                  <label className="ui-switch">
                    <input type="checkbox" />
                    <span className="ui-switch__slider"></span>
                  </label>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/components/switch" className="ui-button ui-button--primary">
                Voir la documentation complète
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Application principale
const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Router>
      <div className="docs-container">
        <button 
          className="mobile-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        
        <Sidebar />
        
        <main className="docs-main">
          <div className="docs-header">
            <h1 className="docs-title">UI Library EQUITECH</h1>
            <p className="docs-subtitle">
              Documentation complète de notre bibliothèque de composants React
            </p>
          </div>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/installation" element={<InstallationPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/components/button" element={<ButtonPage />} />
            <Route path="/components/card" element={<CardPage />} />
            <Route path="/components/input" element={<InputPage />} />
            <Route path="/components/alert" element={<AlertPage />} />
            <Route path="/components/search" element={<SearchPage />} />
            <Route path="/components/pagination" element={<PaginationPage />} />
            <Route path="/components/tabs" element={<TabsPage />} />
            <Route path="/components/datepicker" element={<DatePickerPage />} />
            <Route path="/components/datatable" element={<DataTablePage />} />
            <Route path="/components/breadcrumb" element={<BreadcrumbPage />} />
            <Route path="/components/accordion" element={<AccordionPage />} />
            <Route path="/components/stepper" element={<StepperPage />} />
            <Route path="/components/popover" element={<PopoverPage />} />
            <Route path="/components/loading" element={<LoadingPage />} />
            <Route path="/components/progress" element={<ProgressPage />} />
            <Route path="/components/rating" element={<RatingPage />} />
            <Route path="/components/timeline" element={<TimelinePage />} />
                               <Route path="/components/tree" element={<TreePage />} />
                   <Route path="/components/kanban" element={<KanbanPage />} />
                   <Route path="/components/upload" element={<UploadPage />} />
                   <Route path="/components/rangeslider" element={<RangeSliderPage />} />
                   <Route path="/components/toggleswitch" element={<ToggleSwitchPage />} />
                   <Route path="/components/advanced-dropdown" element={<AdvancedDropdownPage />} />
                   <Route path="/components/time-picker" element={<TimePickerPage />} />
                   <Route path="/components/color-picker" element={<ColorPickerPage />} />
                   <Route path="/components/form" element={<FormPage />} />
                   <Route path="/components/fieldset" element={<FieldsetPage />} />
        <Route path="/components/drawer" element={<DrawerPage />} />
        <Route path="/components/portal" element={<PortalPage />} />
        <Route path="/components/overlay" element={<OverlayPage />} />
                   <Route path="/components/list" element={<ListPage />} />
                   <Route path="/components/calendar" element={<CalendarPage />} />
                   <Route path="/components/*" element={<ComponentsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
