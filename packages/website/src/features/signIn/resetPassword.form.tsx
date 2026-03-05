// import { ButtonPlainContent } from "@coulba/design/buttons"
// import { FormControl, FormError, FormField, FormItem, FormRoot } from "@coulba/design/forms"
// import { InputText } from "@coulba/design/inputs"
// import { toast } from "@coulba/design/overlays"
// import { shared } from "@coulba/schemas/routes"
// import { valibotResolver } from "@hookform/resolvers/valibot"
// import { useForm } from "react-hook-form"
// import * as v from "valibot"
// import { router } from "../../routes/router"
// import { resetPassword } from "../../utilities/api/shared/users/resetPassword"

// export function ResetPasswordForm() {

//     const form = useForm<v.Output<typeof shared.users.patch.resetPassword.body>>({
//         mode: "onSubmit",
//         criteriaMode: "all",
//         shouldFocusError: true,
//         resolver: valibotResolver(shared.users.patch.resetPassword.body),
//     })

//     const onSubmit = async () => {
//         const triggerResponse = await form.trigger()
//         if (!triggerResponse) return

//         await resetPassword({
//             body: form.getValues()
//         })

//         toast({ title: "Email envoyé à l'adresse spécifiée (si elle existe)", variant: "success" })
//         router.navigate({ from: "/connexion/identifiants", to: "/connexion" })
//     }

//     return (
//         <FormRoot {...form}>
//             <form className="w-full flex flex-col justify-start items-stretch gap-3">
//                 <div className="flex flex-col justify-start items-stretch gap-3">
//                     <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                             <FormItem>
//                                 {/* <FormLabel
//                                     label="Email"
//                                     isRequired
//                                 /> */}
//                                 <FormControl>
//                                     <InputText
//                                         value={field.value}
//                                         onChange={field.onChange}
//                                         inputMode="email"
//                                         autoFocus
//                                         placeholder="Email de connexion"
//                                     />
//                                 </FormControl>
//                                 <FormError />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="flex flex-row justify-end items-center gap-1.5">
//                     <ButtonPlainContent
//                         onClick={async () => await onSubmit()}
//                         loader
//                         text="Envoyer l'email de récupération"
//                     />
//                 </div>
//             </form>
//         </FormRoot>
//     )
// }
