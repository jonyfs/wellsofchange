import { Droplet, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-lg">Wells of Change</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-footer-description">
              Mudando vidas, um poço por vez. Levando água potável e tecnologia sustentável para comunidades que mais precisam.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-nav-title">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => document.getElementById("historia")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-historia"
                >
                  Nossa História
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("fazemos")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-fazemos"
                >
                  O Que Fazemos
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("compromisso")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-compromisso"
                >
                  Nosso Compromisso
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("mudanca")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-mudanca"
                >
                  Junte-se a Nós
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-contact-title">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground" data-testid="text-footer-location">
                  Campo Formoso, Bahia, Brasil
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato@wellsofchange.org"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-email"
                >
                  contato@wellsofchange.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p data-testid="text-footer-copyright">
            © {new Date().getFullYear()} Wells of Change. Transformando vidas através da tecnologia e água potável.
          </p>
          <p className="mt-2 text-xs" data-testid="text-footer-transparency">
            Comprometidos com a transparência total. Cada doação é rastreada e cada impacto é documentado.
          </p>
        </div>
      </div>
    </footer>
  );
}
