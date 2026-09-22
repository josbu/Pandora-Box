// 内存缓存
export const memoryCache: Record<string, string> = {};

// 自定义存储（优先使用 pxStore，不存在时降级到 localStorage）
export const customStorage = {
    getItem: (key: string): string | null => {
        // 1. 先检查内存缓存
        if (memoryCache[key] !== undefined) {
            return memoryCache[key];
        }

        // 2. 如果 pxStore 不存在，从 localStorage 恢复
        if (!window.pxStore) {
            const localValue = localStorage.getItem(key);
            if (localValue !== null) {
                memoryCache[key] = localValue;
            }
            return localValue;
        }

        return null;
    },

    setItem: (key: string, value: string): void => {
        // 先存入内存缓存
        memoryCache[key] = value;

        // 如果存在 pxStore（Electron 环境），使用 pxStore 存储
        if (window.pxStore) {
            window.pxStore.set(key, value);
        } else {
            // 纯 Web 开发环境下，降级使用 localStorage 存储
            localStorage.setItem(key, value);
        }
    }
};

// 持久化配置
export const defaultPersist = {
    enabled: true,
    storage: customStorage
};