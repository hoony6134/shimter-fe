import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '@/components/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { postUser } from '@/data/post-user'
import { cn } from '@/lib/utils'

const schools = [
  { value: 'GIST', label: 'GIST' },
  { value: 'KAIST', label: 'KAIST' },
  { value: 'POSTECH', label: 'POSTECH' },
  { value: 'SNU', label: '서울대학교' },
]

const schema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .max(32, '비밀번호는 최대 32자 이하여야 합니다'),
  name: z.string().min(1, '이름을 입력해주세요'),
  nickname: z.string().min(1, '닉네임을 입력해주세요'),
  school: z.string().min(1, '학교를 선택해주세요'),
  number: z
    .string()
    .min(1, '학번을 입력해주세요')
    .regex(/^\d+$/, '학번은 숫자만 입력해주세요'),
})

export function SignUpForm() {
  const nav = useNavigate()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      nickname: '',
      school: '',
      number: '',
    },
  })

  const [openSchool, setOpenSchool] = useState(false)
  const selectedSchoolLabel = schools.find(
    (s) => s.value === form.getValues('school'),
  )?.label

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await postUser({
        email: data.email,
        password: data.password,
        name: data.name,
        nickname: data.nickname,
        school: data.school,
        number: data.number,
      })
      // 회원가입 성공 시 로그인 페이지로 이동
      await nav({ to: '/auth/sign-in' })
    } catch {
      // 에러는 postUser에서 toast로 처리됨
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            'space-y-4',
            form.formState.isSubmitting && 'opacity-50',
          )}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="이메일을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="본명을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="사용할 닉네임을 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>학교인증</FormLabel>
                <FormControl>
                  <Popover open={openSchool} onOpenChange={setOpenSchool}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          'w-full h-10 inline-flex items-center justify-between rounded-md border px-3 text-sm',
                          'bg-background hover:bg-accent/40 transition-colors',
                        )}
                      >
                        <span
                          className={cn(
                            'truncate',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {selectedSchoolLabel ?? '재학중인 학교를 선택하세요'}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 w-[var(--radix-popover-trigger-width)]"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="학교 검색" />
                        <CommandEmpty>검색 결과가 없습니다</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {schools.map((s) => (
                              <CommandItem
                                key={s.value}
                                value={s.label}
                                onSelect={() => {
                                  form.setValue('school', s.value, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                  })
                                  setOpenSchool(false)
                                }}
                                className="cursor-pointer"
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value === s.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {s.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>학번</FormLabel>
                <FormControl>
                  <Input
                    placeholder="학번을 입력하세요"
                    inputMode="numeric"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? '처리 중...' : '완료'}
            </Button>
          </div>
          <div className="text-center pt-2">
            <span className="text-sm text-slate-600">이미 계정이 있나요? </span>
            <Link
              to="/auth/sign-in"
              className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              로그인
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
