const MyPlaylist: React.FC = () => {
  return (
    <main>
      <div>
        {/* Botão LINK de voltar para dashboard */}

        {/* colocar botõa para abrir lista de músicas adicionadas na playlist, com funcionalidade
                 de arastar para a ordem que o usuário desejar */}
        {/* Esse botão será um componente que será utilizado em dashboard também. pois pegara as musicas do localstorage. */}
        <button>Playlist</button>
        <ul>
          <li>
            <h3>Nome da musica</h3>
            <button>Remover ou img</button>
          </li>
        </ul>
      </div>

      <section>
        <h1>Nome da música</h1>

        <img
          src="o proprio usuário coloca a imagem ou colocar um link de imagem aleatória"
          alt="imagem da musica"
        />

        <div>
          {/* tempo de reprodução da música, com funcionalizade de poder arrastar o timer */}
        </div>

        <div>
          {/* Botão de loop,
                        botão de voltar música,
                        botão de play,
                        botão de pular música,
                        Botõa de randomizar músicas da playlist e 
                        botão de baixar a música  */}
        </div>
      </section>
    </main>
  );
};

export default MyPlaylist;
