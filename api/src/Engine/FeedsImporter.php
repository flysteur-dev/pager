<?php

namespace App\Engine;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Output\OutputInterface;
// use \Exception;
use \FeedIo\FeedIo;
use App\Entity\Item;

class FeedsImporter
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var OutputInterface
     */
    private $output;

    /**
     * @type FeedIo
     */
    private $feedIo;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager, FeedIo $feedIo)
    {
        $this->entityManager = $entityManager;
        $this->feedIo = $feedIo;
    }

    public function importAll(OutputInterface $output, $since = 'now - 1 week')
    {
        $this->output('> Start importing all feeds', $output);

        $sources = $this->entityManager->getRepository('App:Feed')->findAll();
        foreach ($sources as $source) {
            $this->handleSource($source, $since);
        }

        $this->output('> Import ended');
    }

    private function handleSource($source, $since)
    {
        $items = $this->getFeed($source, $since);

        $this->saveItems($source, $items);
    }

    private function saveItems($source, $items)
    {
        foreach ($items as $item) {
            $this->output('    > Found : ' . $item->getTitle());

            $Item = new Item();

            $Item
                ->setTitle($item->getTitle())
                ->setLink($item->getLink())
                ->setDate($item->getLastModified())
                ->setAuthor($item->getAuthor())
                ->setReadmore($item->getDescription())
                ->setContent('')
                ->setFeed($source)
            ;

            $this->entityManager->persist($Item);
        }

        $this->entityManager->flush();

        $this->output('  > ' . count($items) . ' items persisted');
    }

    private function getFeed($source, $since)
    {
        $modifiedSince = new \DateTime($since);

        $this->output('  > Importing feed for ' . $source->getName());

        return $this->feedIo->readSince($source->getUrl(), $modifiedSince)->getFeed();
    }

    protected function output($message, $output = null)
    {
        if (!is_null($output)) {
            $this->output = $output;
        }

        if (!is_null($this->output)) {
            $this->output->writeln($message);
        }
    }
}