\# Guia de estilo do OdisseIA
Vale para todas as páginas (DEC-011 e DEC-013).

\- Stack: HTML/CSS/JS puro, sem dependências, sem CDN, abre via file://.
\- Cores: só variáveis em :root. Roxo de destaque: #CD5EFA (provisório, confirmar com o arquivo original do jogo). Roxo é destaque, nunca texto corrido.
\- Fontes: Chakra Petch SemiBold/Bold (locais, assets/fonts/) para títulos, rótulos e números; fonte de sistema no texto corrido. Não carregar a Inter.
\- Forma: cantos cortados em diagonal. Um motivo só, repetido.
\- Espaçamento: só a escala --espaco-\*.
\- Hierarquia: um título grande por página, com contraste forte contra o resto; rótulos pequenos em caixa alta (mínimo 12px), com numeração (01 / 04).
\- Fundo: grade sutil feita em CSS, opacidade baixa, nunca atrás de texto de leitura.
\- Cor especial: a Conclusão é o único momento da jornada autorizado a ampliar muito a cor e os efeitos como recompensa visual, ainda dentro da paleta e das regras de contraste e de movimento.
\- Imagens (assets/img/):
&#x20; \- Engrenagem acesa (PNG) = conteúdo da estação desbloqueado. Engrenagem apagada = PNG derivado da arte original, sem filtro CSS.
&#x20; \- A estação próxima tem o conteúdo ainda bloqueado, então usa a engrenagem cinza. Ela se destaca pelo rótulo PRÓXIMA ESTAÇÃO, pelo tamanho e pela barra roxa, nunca só pela engrenagem ou pela cor.
&#x20; \- A engrenagem é decorativa (alt vazio ou aria-hidden); o estado sempre aparece também em texto.
&#x20; \- Verso da carta só na Estação 4 e na Conclusão, em tamanho de carta (200 a 280 px de largura), com loading="lazy" e dimensões declaradas.
\- Proibido: glow generalizado, gradiente excessivo, glassmorphism, emoji como ícone, hover como requisito, texto pequeno em contorno, fonte nova sem decisão explícita.
\- Acessibilidade: contraste 4,5:1 no texto e 3:1 na interface, alvos de 44px, foco visível (cuidado com clip-path cortando o contorno), prefers-reduced-motion, estados nunca só por cor, sem rolagem horizontal entre 360 e 430px.
\- Layout: celular primeiro. A leitura base continua em coluna estreita. No desktop, o Hub pode chegar a 900px e usa grade 2x2; as Estações 1–3 desbloqueadas usam dossiê de até 832px (160px de contexto + 32px de respiro + até 640px de conteúdo); o Index usa composição editorial própria de até 960px. Outras expansões de desktop só entram com decisão explícita.