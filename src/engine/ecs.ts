export function createWorld() {
  const entities = new Map<number, any>();
  let nextId = 0;
  
  return {
    entities,
    createEntity: () => {
      const id = nextId++;
      entities.set(id, {});
      return id;
    },
    getEntity: (id: number) => entities.get(id),
    removeEntity: (id: number) => entities.delete(id),
    getComponent: (id: number, component: string) => {
      const entity = entities.get(id);
      return entity?.[component];
    },
    setComponent: (id: number, component: string, value: any) => {
      const entity = entities.get(id);
      if (entity) {
        entity[component] = value;
      }
    },
    removeComponent: (id: number, component: string) => {
      const entity = entities.get(id);
      if (entity) {
        delete entity[component];
      }
    },
    getEntitiesWithComponent: (component: string) => {
      return Array.from(entities.values()).filter(e => e[component]);
    }
  };
}

// Simple ECS system registry
type System = () => void;
export const systems: System[] = [];

export function registerSystem(system: System) {
  systems.push(system);
}

export function updateSystems() {
  systems.forEach(system => system());
}