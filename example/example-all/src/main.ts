import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="height: 100%; width: 100%; display: flex; flex-direction: row">
    <iframe style="flex: 1; border: none" src="http://localhost:5100" height="100%"></iframe>
    <iframe style="flex: 1; border: none" src="http://localhost:5101" height="100%"></iframe>
    <iframe style="flex: 1; border: none" src="http://localhost:5102" height="100%"></iframe>
    <iframe style="flex: 1; border: none" src="http://localhost:5103" height="100%"></iframe>
  </div>
`;
