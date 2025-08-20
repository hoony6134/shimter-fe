import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '@/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { postUser } from '@/data/post-user'
import { cn } from '@/lib/utils'

const schema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .max(32, '비밀번호는 최대 32자 이하여야 합니다'),
  name: z.string().min(1, '이름을 입력해주세요'),
  phoneNumber: z.string().min(1, '전화번호를 입력해주세요'),
  deviceId: z.string().min(1, '장치 ID를 입력해주세요'),
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
      phoneNumber: '',
      deviceId: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await postUser({
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
        deviceId: data.deviceId,
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
                    <Input placeholder="이름을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>전화번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="전화번호를 입력하세요"
                      inputMode="numeric"
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
            name="deviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>장치 ID</FormLabel>
                <FormControl>
                  <Input placeholder="장치 ID를 입력하세요" {...field} />
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
              className="text-sm text-emerald-600 font-semibold hover:text-blue-800 transition-colors"
            >
              로그인
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
