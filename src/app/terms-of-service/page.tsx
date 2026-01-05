import Link from "next/link";
import { Settings } from "lucide-react";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";
export default function page() {
    return (
        <>
            <div className='w-screen h-[10vh] md:h-[7vh]'></div>
            <div className="relative min-h-screen gap-4 w-screen overflow-hidden flex flex-col  items-center justify-center">
                <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
                <StripeBackground />
                <RectorInlineTitle />
                <div className="relative mb-48 z-2 flex flex-col gap-4 justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
                    <CompetitionTitleHeader title="Terms of Service" shouldFitContent={true} />
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <div className="bg-black/40 border-white border-3 rounded-full p-4">
                            <Settings className="w-16 h-16 text-white" />
                        </div>

                        {/* Scrollable Terms content */}
                        <div className="w-full max-w-3xl max-h-[60vh] overflow-y-auto p-6 bg-[#00000020] rounded-lg custom-scrollbar space-y-4">
                            <p className="text-white text-lg leading-relaxed">
                                By using the Rector Cup UC 2026 platform you agree to these Terms of Service.
                            </p>

                            <h3 className="text-white font-bold">1. Acceptance</h3>
                            <p className="text-white">Use of this site for registration and participation constitutes acceptance of these terms.</p>

                            <h3 className="text-white font-bold">2. Eligibility</h3>
                            <p className="text-white">Only active Ciputra University students with an official ciputra.ac.id email may register and participate.</p>

                            <h3 className="text-white font-bold">3. Accounts & Data</h3>
                            <p className="text-white">Authentication is via Google OAuth. Provide accurate information (name, NIM, faculty). Uploaded assets (profile images, follow proof) are used for verification and event documentation.</p>

                            <h3 className="text-white font-bold">4. Registration & Participation</h3>
                            <p className="text-white">Registration statuses are managed as Pending, Registered, or Failed. Team joins and member approvals follow the platform workflow; admins may remove or reject invalid registrations.</p>

                            <h3 className="text-white font-bold">5. Conduct & Rules</h3>
                            <p className="text-white">Participants must follow competition-specific rules. Cheating, vote manipulation, or fraudulent submissions may lead to disqualification.</p>

                            <h3 className="text-white font-bold">6. Data Retention & Security</h3>
                            <p className="text-white">Data is stored securely and sessions may be persisted using JWT and secure cookies. Deletion of users or teams will cascade-remove related records to maintain integrity.</p>

                            <h3 className="text-white font-bold">7. Termination</h3>
                            <p className="text-white">Organizers reserve the right to suspend or remove accounts or registrations for policy violations or identity discrepancies.</p>

                            <h3 className="text-white font-bold">8. Contact</h3>
                            <p className="text-white">Questions or requests (including data deletion) can be submitted via your Liaison Officer or the PDD Website team through the dashboard.</p>
                        </div>

                        <div className="text-2xl text-white bg-black/30 border-white border-3 rounded-lg px-4 py-2 text-center font-bold uppercase">
                            <Link href={"/"}>Go back to home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
