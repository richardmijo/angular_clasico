# ⚡ Angular Performance Lab: Zone.js vs Signals

Este proyecto es una demostración educativa diseñada para visualizar y sentir la diferencia drástica de rendimiento entre el **"Angular Clásico"** (dependiente de Zone.js) y el **"Angular Moderno"** (impulsado por Signals y ChangeDetectionStrategy.OnPush).

![Angular Version](https://img.shields.io/badge/Angular-v17%2B-dd0031)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 Objetivo Didáctico

El objetivo es contrastar dos paradigmas de renderizado en Angular mediante un escenario extremo de **filtrado en tiempo real de 3,000 elementos**:

1.  **🔴 Lado Lento (Legacy Anti-Patterns)**: Simula una aplicación antigua u optimizada pobremente.
2.  **🟢 Lado Rápido (Modern Best Practices)**: Muestra el poder de la reactividad granular con Signals.

---

## 🏗️ Arquitectura del Experimento

La pantalla está dividida en dos secciones independientes:

### 🔴 Lado Lento (Izquierda)
*   **Mecanismo**: Usa `Zone.js` para la detección de cambios.
*   **Anti-patrones Implementados**:
    *   Uso de `[(ngModel)]` sin estrategias de control.
    *   **Filtrado en el Template**: El filtro corre en cada ciclo de detección de cambios global.
    *   **Carga Artificial**: Cada item de la lista ejecuta la función `getHeavyTitle()` que realiza cálculos matemáticos pesados en tiempo real.
*   **Resultado Observable**: Al escribir en el input, la interfaz se congela ("Jank"), el input responde lento y la CPU se satura. "Zone.js" detecta cambios en toda la app por cada tecla presionada.

### 🟢 Lado Rápido (Derecha)
*   **Mecanismo**: `ChangeDetectionStrategy.OnPush` + **Signals**.
*   **Mejores Prácticas**:
    *   **Reactividad**: El estado (lista de canciones y término de búsqueda) son `Signals`.
    *   **Computed Signals**: La lista filtrada es un `computed()`, que solo se recalcula cuando sus dependencias cambian y está memoizado.
    *   **Renderizado Optimizado**: Usa la sintaxis moderna `@for`.
*   **Resultado Observable**: Filtrado instantáneo (60fps), sin bloqueo del UI, independientemente de la carga de datos.

---

## 🚀 Cómo Ejecutar el Proyecto

Este proyecto es Standalone y no requiere configuración compleja.

### Prerrequisitos
*   Node.js (v18 o superior)
*   NPM

### Pasos
1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/richardmijo/angular_clasico.git
    cd angular_clasico
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm start
    ```

4.  **Abrir en el navegador**:
    Visita `http://localhost:4200`

---

## 🧪 Guía de Pruebas

Para experimentar la diferencia real, sigue estos pasos:

1.  Abre la **Consola del Desarrollador** (F12) en tu navegador.
2.  Ve al **Lado Lento (Rojo)** y escribe rápido cualquier texto (ej: "Song").
    *   *Observa*: El retraso entre lo que tecleas y lo que aparece.
    *   *Consola*: Verás miles de logs `🔴 SlowSide: Detectando cambios...`.
3.  Ve al **Lado Rápido (Verde)** y escribe lo mismo.
    *   *Observa*: Fluidez total e inmediata.
    *   *Consola*: Silencio absoluto (o logs mínimos), indicando que Angular no está redibujando innecesariamente.

---

## 📂 Estructura de Archivos Clave

*   `src/app/slow-side/slow-side.component.ts`: Donde ocurre "el desastre". Mira la función `getHeavyTitle` y cómo `ngDoCheck` se dispara constantemente.
*   `src/app/fast-side/fast-side.component.ts`: La solución elegante. Mira el uso de `signal()`, `computed()` y `ChangeDetectionStrategy.OnPush`.

---

## 📝 Conclusión para Estudiantes

Este demo prueba que **Zone.js** (el modelo por defecto antiguo) puede sufrir problemas de rendimiento si no se tiene cuidado, ya que cualquier evento dispara una revisión global. **Signals**, por otro lado, permite a Angular saber *exactamente* qué cambió y actualizar *solo* lo necesario, permitiendo interfaces fluidas incluso con cálculos complejos.
