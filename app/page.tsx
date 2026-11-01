import { Alert } from "../components/alert/alert";
import { Badge } from "../components/badge/badge";
import { Button } from "../components/button/button";
import { Card } from "../components/card/card";
import { Checkbox } from "../components/checkbox/checkbox";
import { Input } from "../components/input/input";

export default function Home() {
  return (
    <main>
      <section className="band">
        <div className="container reading">
          <p className="eyebrow">Del prompt a la especificación</p>
          <h1 className="display">Diseñar con contratos, no con prompts</h1>
          <p className="lead">
            Un prompt es una conversación. Una especificación es un acuerdo. Este repositorio es un sistema de diseño
            pequeño en el que personas y agentes de IA trabajan desde la misma fuente de verdad.
          </p>
          <div className="actions">
            <Button>Ver el registro</Button>
            <Button variant="secondary">Leer AGENTS.md</Button>
            <Button variant="tertiary">Abrir en Figma</Button>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="grid">
            <Card variant="warm" eyebrow="registry/md" title="La spec explica">
              <p>Qué es el componente, para qué sirve y por qué se tomó cada decisión.</p>
            </Card>
            <Card eyebrow="registry/json" title="El contrato obliga">
              <p>Props, variantes, tokens y reglas que el código debe cumplir sí o sí.</p>
            </Card>
            <Card eyebrow="button.spec.ts" title="El test verifica">
              <p>Comprueba en cada cambio que el código sigue cumpliendo el contrato.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container reading">
          <div className="actions">
            <p className="eyebrow">Inscripción</p>
            <Badge variant="strong">plazas limitadas</Badge>
          </div>
          <h2 className="display">Apúntate al workshop</h2>
          <form className="form">
            <Input label="Nombre" name="nombre" placeholder="Ada Lovelace" required />
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              defaultValue="ada.lovelace"
              error="Escribe un correo con @"
              required
            />
            <Checkbox label="Quiero recibir los materiales" name="materiales" defaultChecked />
            <Checkbox label="Acepto las condiciones" name="condiciones" required />
            <Alert variant="error" title="El pago no se ha completado">
              <p>Tu banco ha rechazado la operación. Tu plaza sigue reservada durante 15 minutos.</p>
              <Button variant="secondary">Reintentar pago</Button>
            </Alert>
            <div className="actions">
              <Button type="submit">Reservar plaza</Button>
            </div>
          </form>
        </div>
      </section>

      <section className="band band--inverse">
        <div className="container reading">
          <p className="eyebrow">Gobernanza</p>
          <h2 className="display">Si no está en el contrato, el agente no lo inventa.</h2>
        </div>
      </section>

      <footer className="band">
        <div className="container footer">
          <p>
            Xavier Pascual · <a href="https://mokkapp.com">Mokkapp.com</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
