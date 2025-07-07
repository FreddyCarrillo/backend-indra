# BACKEND INDRA

Servicio de usuarios con arquitectura hexagonal y documentación Swagger.

## 🚀 Comandos disponibles

### Desarrollo local con Swagger
```bash
npm run dev
```
- **Puerto**: 3000
- **URL**: http://localhost:3000
- **Documentación**: http://localhost:3000/docs
- **Incluye**: Swagger UI completo para desarrollo

### Serverless offline (sin Swagger)
```bash
npm run offline
# o
npx serverless offline
```
- **Puerto**: 3000
- **URL**: http://localhost:3000
- **Sin documentación**: Swagger no está disponible en este modo
- **Propósito**: Emular entorno AWS Lambda para testing

### Producción
```bash
npm run build
npm start
```

## 📚 Endpoints

### POST /users
Crea un nuevo usuario.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

**Response (201):**
```json
{
  "id": "uuid-generado",
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

## 🏗️ Arquitectura

```
src/
├── application/          # Casos de uso
├── domain/              # Entidades y repositorios
├── infrastructure/      # Implementaciones externas
│   ├── api/            # Handlers HTTP
│   └── db/             # Repositorios de datos
├── config/              # Configuración de dependencias
└── server.ts           # Servidor de desarrollo
```

## 🔧 Tecnologías

- **TypeScript**
- **Express.js**
- **Serverless Framework**
- **Swagger UI** (solo en desarrollo)
- **Jest** (testing)

## 📝 Notas importantes

- **Swagger solo funciona en desarrollo** (`npm run dev`)
- **Serverless offline no incluye Swagger** por limitaciones de compatibilidad
- **Producción**: Solo endpoints de API, sin documentación web

---

## 1️⃣ Estructura de carpetas sugerida para el dominio

```
<code_block_to_apply_changes_from>
```

---

## 2️⃣ **Entidades**

### a) Appointment (Agendamiento)
Representa una cita médica agendada.

```ts
// src/domain/entities/Appointment.ts
export type AppointmentStatus = 'pending' | 'completed';

export class Appointment {
  constructor(
    public id: string, // UUID
    public insuredId: string,
    public scheduleId: number,
    public countryISO: 'PE' | 'CL',
    public status: AppointmentStatus,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
```

---

### b) Schedule (Espacio de agenda)
Representa el espacio disponible para agendar.

```ts
export class Schedule {
  constructor(
    public id: number,
    public centerId: number,
    public specialtyId: number,
    public medicId: number,
    public date: string
  ) {}
}
```

---

### c) Insured (Asegurado)
Solo para referencia, ya que el asegurado ya está registrado.

```ts
export class Insured {
  constructor(
    public id: string,
    public name: string
  ) {}
}
```

---

## 3️⃣ **Puertos (interfaces)**

### a) AppointmentRepository (DynamoDB)
Para guardar y actualizar el estado del agendamiento.

```ts
import { Appointment } from '../entities/Appointment';

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  updateStatus(id: string, status: 'pending' | 'completed'): Promise<void>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | null>;
}
```

---

### b) AppointmentCountryRepository (RDS por país)
Para guardar el agendamiento final en la base de datos del país.

```ts
import { Appointment } from '../entities/Appointment';

export interface AppointmentCountryRepository {
  saveCountryAppointment(appointment: Appointment): Promise<void>;
}
```

## Ejemplos de uso con curl

### Crear una cita

```bash
curl -X POST https://neaxp5i375.execute-api.us-east-1.amazonaws.com/appointments \
  -H "Content-Type: application/json" \
  -d '{"insuredId":"12345","scheduleId":100,"countryISO":"PE"}'
```

### Listar citas por asegurado

```bash
curl https://neaxp5i375.execute-api.us-east-1.amazonaws.com/appointments/12345
```

(Reemplaza `12345` por el insuredId que desees consultar)

---

## Ejecutar tests

Para ejecutar los tests del proyecto, usa:

```bash
npm test
```

o si usas yarn:

```bash
yarn test
```
