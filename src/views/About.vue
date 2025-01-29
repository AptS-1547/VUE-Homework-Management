<template>
    <div class="bg-white py-24 md:py-32">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-5">
        <div class="max-w-2xl xl:col-span-2">
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">关于我们</h2>
          <p class="mt-6 text-lg/8 text-gray-600">本系统为开源系统，根据 GPL-3.0 协议许可</p>
          <p class="mt-6 text-lg/8 text-gray-600">源自于一声玩笑，但我们努力让它变成了现实</p>
          <p class="mt-6 text-lg/8 text-gray-600">©️ 2021-2025 The ESAP Project, All Rights Reserved.</p>
        </div>
        <ul role="list" class="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3">
          <li v-for="person in people" :key="person.name" class="flex flex-col gap-10 pt-12 sm:flex-row">
            <img class="aspect-4/5 w-52 flex-none rounded-2xl object-cover" :src="person.imageUrl" alt="" />
            <div class="max-w-xl flex-auto">
              <h3 class="text-lg/8 font-semibold tracking-tight text-gray-900">{{ person.name }}</h3>
              <p class="text-base/7 text-gray-600">{{ person.role }}</p>
              <p class="mt-6 text-base/7 text-gray-600">{{ person.bio }}</p>
              <ul role="list" class="mt-6 flex gap-x-6">
                <li>
                  <a :href="person.githubUrl" class="text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Github</span>
                    <svg class="size-10" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000">
                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"></path>
                            </g>
                            </g>
                        </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  const people = [
    {
      name: 'AptS:1547',
      role: '运维 / 全栈',
      imageUrl:
        'https://cn.cravatar.com/avatar/f42f9f288e5ba41aef369b4edd3c5f5c?d=retro&s=1024',
      bio: '我们在少量的 Nginx 配置文件中找到了大量的 CORS 跨域错误',
      githubUrl: 'https://github.com/AptS-1547/',
    },
    {
      name: 'AptS:1548',
      role: '运维 / 后端',
      imageUrl:
        'https://weavatar.com/avatar/eafbce3047d71170f941afb26ce954fa?s=1024&d=mm&r=g',
      bio: '喵喵喵？',
      githubUrl: 'https://github.com/AptS-1548/',
    }
  ]
  
  </script>