import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const stats = {
    livres: { total: 1250, disponibles: 1153 },
    membres: { total: 345, actifs: 287 },
    emprunts: { total: 135, retard: 8 }
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Bienvenue sur le tableau de bord</h1>
        <p className="dashboard-subtitle">Gérez votre bibliothèque et suivez son activité</p>
      </div>
      
      <div className="stats-grid">
        <StatCard 
          title="Livres" 
          mainValue={stats.livres.total} 
          subValue={`${stats.livres.disponibles} disponibles`} 
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path>
            </svg>
          }
          color="blue" 
        />
        <StatCard 
          title="Membres" 
          mainValue={stats.membres.total} 
          subValue={`${stats.membres.actifs} actifs`} 
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          }
          color="green" 
        />
        <StatCard 
          title="Emprunts" 
          mainValue={stats.emprunts.total} 
          subValue={`${stats.emprunts.retard} en retard`} 
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"></path>
            </svg>
          }
          color="amber" 
        />
      </div>
      
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Activités récentes</h3>
            <button className="view-all">Voir tout</button>
          </div>
          <div className="activity-list">
            <ActivityItem 
              text="Pierre Dupont a emprunté 'Les Misérables'" 
              time="Il y a 2 heures" 
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path>
                </svg>
              } 
            />
            <ActivityItem 
              text="Marie Martin a rendu 'Le Petit Prince'" 
              time="Il y a 4 heures" 
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              } 
            />
            <ActivityItem 
              text="Nouveau livre ajouté: '1984' de George Orwell" 
              time="Il y a 1 jour" 
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              } 
            />
            <ActivityItem 
              text="Jean Dupont est en retard pour 'Dune'" 
              time="Il y a 2 jours" 
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              } 
            />
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Livres populaires</h3>
            <button className="view-all">Voir tout</button>
          </div>
          <div className="book-list">
            <PopularBookItem title="Les Misérables" author="Victor Hugo" borrowCount={12} />
            <PopularBookItem title="Le Petit Prince" author="Antoine de Saint-Exupéry" borrowCount={10} />
            <PopularBookItem title="1984" author="George Orwell" borrowCount={8} />
            <PopularBookItem title="Dune" author="Frank Herbert" borrowCount={7} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Composants utilitaires
const StatCard = ({ title, mainValue, subValue, icon, color }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <h3 className="stat-title">{title}</h3>
        <div className={`stat-icon-container ${color}`}>
          {icon}
        </div>
      </div>
      <div className="stat-content">
        <p className="stat-value">{mainValue}</p>
        <p className="stat-subvalue">{subValue}</p>
      </div>
    </div>
  );
};

const ActivityItem = ({ text, time, icon }) => {
  return (
    <div className="activity-item">
      <div className="activity-icon">
        {icon}
      </div>
      <div className="activity-content">
        <p className="activity-text">{text}</p>
        <p className="activity-time">{time}</p>
      </div>
    </div>
  );
};

const PopularBookItem = ({ title, author, borrowCount }) => {
  return (
    <div className="book-item">
      <div className="book-info">
        <p className="book-title">{title}</p>
        <p className="book-author">{author}</p>
      </div>
      <div className="borrow-count">
        {borrowCount} emprunts
      </div>
    </div>
  );
};

export default Dashboard;