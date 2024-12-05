import React, { useEffect } from 'react';
import './CenteredPage.css';
import { useNavigate } from 'react-router-dom';

const RelatorioProdutos: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    document.body.appendChild(scriptElement);

    scriptElement.onload = () => {
      const divElement = document.getElementById('viz1733409937194');
      if (divElement) {
        const vizElement = divElement.getElementsByTagName('object')[0];
        if (vizElement) {
          vizElement.style.width = '100%';
          vizElement.style.height = '100%';
        }
      }
    };
  }, []);

  return (
    <>
      <header className="header">
        <img src="/logo-small.jpg" alt="Logo" className="logo" />
        <button className="modal-button" onClick={() => navigate('/relatorios')}>
          Volver a Relatórios
        </button>
      </header>

      <div className="main-content">
        <div className="container">
          <div className="tableauPlaceholder" id="viz1733409937194" style={{ position: 'relative' }}>
            <noscript>
              <a href="#">
                <img 
                  alt="História 1" 
                  src="https://public.tableau.com/static/images/Li/Livro1_17334089640210/Painel1/1_rss.png" 
                  style={{ border: 'none' }} 
                />
              </a>
            </noscript>
            <object className="tableauViz">
              <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
              <param name="embed_code_version" value="3" />
              <param name="site_root" value="" />
              <param name="name" value="Livro1_17334089640210/Painel1" />
              <param name="tabs" value="no" />
              <param name="toolbar" value="yes" />
              <param name="static_image" value="https://public.tableau.com/static/images/Li/Livro1_17334089640210/Painel1/1.png" />
              <param name="animate_transition" value="yes" />
              <param name="display_static_image" value="yes" />
              <param name="display_spinner" value="yes" />
              <param name="display_overlay" value="yes" />
              <param name="display_count" value="yes" />
              <param name="language" value="pt-BR" />
              <param name="filter" value="publish=yes" />
            </object>
          </div>
        </div>
      </div>

      <footer className="footer">
        &copy; 2024 Pinheirinho Restaurant
      </footer>
    </>
  );
};

export default RelatorioProdutos;
