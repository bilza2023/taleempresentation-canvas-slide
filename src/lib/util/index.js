// @ts-nocheck
import { browser } from '$app/environment';
import { onMount } from 'svelte';
import { fade } from 'svelte/transition';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';

import Icons from './icons';
import uuid from './uuid';

            export {
                    onMount,
                    fade,
                    get,
                    uuid,
                    goto,
                    browser,
                    Icons,
            }
