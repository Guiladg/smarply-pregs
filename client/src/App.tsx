import { useState } from 'react';

function App() {
	const [loading, setLoading] = useState(false);
	const [pregunta, setPregunta] = useState('');
	const [publicacion, setPublicacion] = useState('');
	const [link, setLink] = useState('');

	const fetchPregunta = () => {
		setLoading(true);
		fetch(`${process.env.REACT_APP_API_ROUTE}/pregunta`)
			.then((data) => data.json())
			.then((data) => {
				setPregunta(data.texto);
				setPublicacion(data.publicacion.htmlData);
				setLink(`https://articulo.mercadolibre.com.ar/MLA-${data.publicacion.meLiId}`);
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <div id="telon">cargando...</div>}
			<div className="divMain">
				<div className="divConsola">
					<h1>Smarply</h1>
					<div id="divPregunta">{pregunta}</div>
					<div className="divBotones">
						<button onClick={fetchPregunta} id="btnSi">
							Sí
						</button>
						<button onClick={fetchPregunta} id="btnNo">
							No
						</button>
						<button onClick={fetchPregunta} id="btnPregunta">
							Pasar
						</button>
					</div>
					<div id="divResultados">
						<div>
							<div>Ttl</div>
							<div id="divResultadosTotal">0</div>
						</div>
						<div>
							<div>Sí</div>
							<div id="divResultadosSi" data-total="0">
								0
							</div>
						</div>
						<div>
							<div>No</div>
							<div id="divResultadosNo" data-total="0">
								0
							</div>
						</div>
					</div>
					<a href={link} id="btnLink" target="_blank">
						Ver publicación
					</a>
				</div>
				<div id="divMeLi" dangerouslySetInnerHTML={{ __html: publicacion }} />
			</div>
		</>
	);
}

export default App;
