import React from 'react';
import './index.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import ProjectOverview from './components/ProjectOverview/ProjectOverview';
import ProjectStructure from './components/ProjectStructure/ProjectStructure';
import Architecture from './components/Architecture/Architecture';
import Features from './components/Features/Features';
import TechStack from './components/TechStack/TechStack';
import Installation from './components/Installation/Installation';
import Scripts from './components/Scripts/Scripts';
import Usage from './components/Usage/Usage';
import APIEndpoints from './components/APIEndpoints/APIEndpoints';
import Contributing from './components/Contributing/Contributing';
import FutureEnhancements from './components/FutureEnhancements/FutureEnhancements';
import Acknowledgement from './components/Acknowledgement/Acknowledgement';
import License from './components/License/License';

const Documents = () => {
  return (
    <div className="documents-container">
      <Header />
      <div className="content-wrapper">
        <NavBar />
        <main className="main-content">
          <ProjectOverview />
          <ProjectStructure />
          <Architecture />
          <Features />
          <TechStack />
          <Installation />
          <Scripts />
          <Usage />
          <APIEndpoints />
          <Contributing />
          <FutureEnhancements />
          <Acknowledgement />
          <License />
        </main>
      </div>
    </div>
  );
};

export default Documents;
