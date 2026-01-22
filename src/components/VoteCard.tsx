'use client'
import Image from 'next/image'
import PixelCard from './PixelCard'
import { useState } from 'react'
import { voteForCandidate, unvoteCandidate } from '@/app/actions/vote'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface VoteCardProps {
  name: string;
  imageSrc: string;
  candidateId: string;
  competitionId: string;
  initialVoteCount: number;
  hasVotedInCompetition: boolean;
  isVotedByMe: boolean;
}

export default function VoteCard({ 
  name, 
  imageSrc, 
  candidateId, 
  competitionId,
  initialVoteCount,
  hasVotedInCompetition,
  isVotedByMe
}: VoteCardProps) {
  const [imgSrc, setImgSrc] = useState(imageSrc || '/placeholder/no-image.svg');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleVote = async () => {
    if (isLoading || hasVotedInCompetition) return;

    if (!confirm(`Are you sure you want to vote for ${name}?`)) return;

    setIsLoading(true);
    
    try {
      const result = await voteForCandidate(candidateId, competitionId);
      if (!result.success) {
        alert(result.error);
      }
    } catch (error) {
     console.error(error);
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  const handleUnvote = async () => {
    if (isLoading || !isVotedByMe) return;

    if (!confirm(`Are you sure you want to remove your vote for ${name}?`)) return;

    setIsLoading(true);

    try {
      const result = await unvoteCandidate(competitionId);
      if (!result.success) {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  // Logic: Show "VOTE" button if user hasn't voted in this competition yet.
  // If user HAS voted in this competition (for anyone), show the vote count.
  // Exception: If this card is the one I voted for, maybe highlight it.
  
  const showCount = hasVotedInCompetition; 
  const canVote = !hasVotedInCompetition;

  return (
    <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
      <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-2 overflow-hidden'>
        <h2 className="text-white text-xl font-bold text-center line-clamp-2 w-full flex-shrink-0">{name}</h2>
        <div className="flex justify-center w-full flex-1 items-center min-h-0 relative">
          <Image 
            src={imgSrc} 
            alt={name} 
            loading="lazy"
            width={200} 
            height={200} 
            onError={() => setImgSrc('/placeholder/no-image.svg')}
            className="object-center object-cover h-full w-full rounded-lg border-white" 
          />
           {/* Overlay for "Voted" status if needed, or just button change */}
           {isVotedByMe && (
             <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
               Voted
             </div>
           )}
        </div>
        
        {isVotedByMe ? (
          <button 
            onClick={handleUnvote}
            disabled={isLoading}
            className="bg-red-500 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed duration-200 transition-all w-full py-2 flex-shrink-0 flex justify-center items-center h-[50px]"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'UNVOTE'}
          </button>
        ) : hasVotedInCompetition ? (
           <div className="w-full text-center py-2 bg-black/40 border-white border-3 text-white font-bold rounded-lg flex flex-col justify-center items-center h-[50px]">
             <span className='text-xs font-normal uppercase opacity-80'>Votes</span>
             <span className='text-lg'>{initialVoteCount}</span>
           </div>
        ) : (
          <button 
            onClick={handleVote}
            disabled={isLoading || !canVote}
            className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed duration-200 transition-all w-full py-2 flex-shrink-0 flex justify-center items-center h-[50px]"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'VOTE'}
          </button>
        )}
      </div>
    </PixelCard>
  )
}
